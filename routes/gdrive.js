const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const credentials  = {"web":{
    "client_id":process.env.GOOGLE_CLIENT_ID,
    "project_id":process.env.GOOGLE_PROJECT_ID,
    "auth_uri":process.env.GOOGLE_AUTH_URI,
    "token_uri":process.env.GOOGLE_TOKEN_URI,
    "auth_provider_x509_cert_url":process.env.GOOGLE_AUTH_PROVIDER,
    "client_secret":process.env.GOOGLE_CLIENT_SECRET,
    "redirect_uris":["http://localhost:3000/gdrive"]}}
const {client_secret, client_id, redirect_uris} = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file'];


router.get('/getAuthUrl', (req, res)=>{
  getAccessToken(oAuth2Client);
  function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    if (authUrl){
      return res.send({
        url:authUrl,
        status:true
      })
    }else{
      return res.send({
        url:authUrl,
        status:false
      })
    }
  }
});
router.post('/getFiles', async (req, res)=>{
  /*
  * First verify if we are already getting the token ( if user relaod the page ) then user the token
  * otherwise generate the new token for getting data
  * */
  if (req.body.token){
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({version: 'v3', auth:oAuth2Client});
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, iconLink, webContentLink)',
    }, (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = response.data.files;
      if (files.length) {
        return res.json({
          success:true,
          files:files
        })
      } else {
        return res.json({
          success:true,
          files:files
        })
      }
    });
  }else{
    const {tokens} = await oAuth2Client.getToken(req.body.code);
    oAuth2Client.setCredentials(tokens);
    const drive = google.drive({version: 'v3', auth:oAuth2Client});
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, iconLink)',
    }, (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = response.data.files;
      if (files.length) {
        return res.json({
          success:true,
          files:files,
          token:tokens
        })
      } else {
        return res.json({
          success:true,
          files:files,
          token:tokens
        })
      }
    });
  }


})
router.post('/uploadFile', async (req, res)=>{
  if (req.body.token){
    console.log(JSON.parse(req.body.token))
    oAuth2Client.setCredentials(JSON.parse(req.body.token));
    const drive = google.drive({version: 'v3', auth:oAuth2Client});
    const myFile = req.files.file;
    let fileMetadata = {
      'name': `${myFile.name}`
    };
    myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
      if (err) {
        return res.status(500).send({ msg: "Error occured" });
      }
      let media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(`${__dirname}/${myFile.name}`)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('File Id: ', file.data.id);
        }
      });
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
    });



  }else{
    return res.json({
      success:false,
      msg:'You need to send token to upload file to google drive'
    })
  }
})
module.exports = router;
