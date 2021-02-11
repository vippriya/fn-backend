const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = {
  fetch,
  clientId: process.env.DROPBOX_CLIENTID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
};
const { Dropbox } = require('dropbox'); // eslint-disable-line import/no-unresolved
const hostname = 'localhost';
const port = 3000;
const dbx = new Dropbox(config);
const redirectUri = `http://${hostname}:${port}/auth`;

/*Authorize user with Dropbox*/
router.get('/', (req, res) => {
  dbx.auth.getAuthenticationUrl(redirectUri, null, 'code', 'offline', null, 'none', false)
    .then((authUrl) => {
      res.writeHead(302, { Location: authUrl });
      res.end();
    });
});
/*Get token of the login user*/
router.get('/auth', (req, res) => { // eslint-disable-line no-unused-vars
  const { code } = req.query;
  console.log(`code:${code}`);

  dbx.auth.getAccessTokenFromCode(redirectUri, code)
    .then((token) => {
      console.log(`Token Result:${JSON.stringify(token)}`);
      dbx.auth.setRefreshToken(token.result.refresh_token);
      dbx.usersGetCurrentAccount()
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
/*Fet file of the login user*/
router.get('/files', (req, res) => { // eslint-disable-line no-unused-vars
  /*
  Ideally you will get the accesss token in the previous api call /auth.
  The below code shows the API for fetching the files
  * */

  let dbx = new Dropbox({ accessToken: 'sl.ArBWx2oaWy_amQQ8v5xrxMhnXeuDYNyTjCWGselck5EoDatLjipswCrC4msjy5X8vOzBl71d3Q6NAa6acRA7wSNc8l47cOhp_piCdUBUFQgp4zWhF7tM42bz7uLhuMY16sKgCrM' });
  dbx.filesListFolder({path: ''})
    .then(function(response) {
      console.log(response.result.entries);
    })
    .catch(function(error) {
      console.log(error);
    });
});
module.exports = router;

