/**
 * CONFIG PARAMETERS
 * useHmac: Use HMAC credentials - defaults to false
 * bucketName: The name of the selected bucket
 * serviceCredential: This is a  service credential created in a service instance
 *
 * INSTRUCTIONS
 * - Install Nodejs 10 or above, Then run the following commands
 * - npm i ibm-cos-sdk
 * - npm i request-promise
 * - node <scriptName>
 *
 * ========= Example Configuration =========
 * export default {
 *   useHmac: false,
 *   bucketName: 'testbucketname',
 *   serviceCredential: {
 *     "apikey": "XXXXXXXX",
 *     "cos_hmac_keys": {
 *       "access_key_id": "XXXXXXXXX",
 *       "secret_access_key": "XXXXXXXX"
 *     },
 *     "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
 *     "iam_apikey_description": "Auto-generated for key XXXXXX-XXXX-XXXX-XXXX",
 *     "iam_apikey_name": "Service credentials-2",
 *     "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
 *     "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/XXXXXXXX::serviceid:ServiceId-XXXXX-XXXXX-XXXXX",
 *     "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/XXXXXXXX:XXXXX-XXXXX-XXXXX-XXXX::"
 *   },
 * };
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const defaultEndpoint = 's3.us.cloud-object-storage.appdomain.cloud';

// ========= Configuration =========
let CONFIG = {
  useHmac: false,
  bucketName: 'cloud-object-storage-30-cos-standard-k7i',
  serviceCredential: {
    "apikey": "Cee4vzYXWSW9tpHQGdCXA0TtJFKnYJngDxZlVng4w93A",
    "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
    "iam_apikey_description": "Auto-generated for key 9628a42d-2c73-46a0-9c8d-29c373c46c4e",
    "iam_apikey_name": "cloud-object-storage-30-cos-standard-k7i",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/6d8290a6148d4486a18cc9532ac0cdd1::serviceid:ServiceId-3231e07a-ff07-4127-bc34-05b578ea57ef",
    "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/6d8290a6148d4486a18cc9532ac0cdd1:f2cad7b9-1ce5-4456-8e1e-da070bd028d6::"
  }
};

const IBMCOS = require('ibm-cos-sdk');
const rp = require('request-promise');

const getS3 = async (endpoint, serviceCredential) => {
  let s3Options;

  if (serviceCredential.apikey) {
    /*
       * Cloud Object Storage S3 can be access via two types of credentials. IAM/HMAC
       * An IAM APIKey can be used to create an S3 Object as below.
       * The APIKey, S3 endpoint and resource Instance Id are required
       */
    s3Options = {
      apiKeyId: serviceCredential.apikey,
      serviceInstanceId: serviceCredential.resource_instance_id,
      region: 'ibm',
      endpoint: new IBMCOS.Endpoint(endpoint),
    };
  } else {
    throw new Error('IAM ApiKey required to create S3 Client');
  }

  console.info(' S3 Options Used: \n', s3Options);
  console.debug('\n\n ================== \n\n');
  return new IBMCOS.S3(s3Options);
};

const getS3Hmac = async (endpoint, serviceCredential) => {
  let s3Options;

  if (serviceCredential.cos_hmac_keys && serviceCredential.cos_hmac_keys.access_key_id) {
    /*
      * Cloud Object Storage S3 can be access via two types of credentials. IAM/HMAC
      * An HMAC Credential is the equivalent of the AWS S3 credential type
      * The Access Key Id, Secret Access Key, and S3 Endpoint are needed to use HMAC.
      */
    s3Options = {
      accessKeyId: serviceCredential.cos_hmac_keys.access_key_id,
      secretAccessKey: serviceCredential.cos_hmac_keys.secret_access_key,
      region: 'ibm',
      endpoint: new IBMCOS.Endpoint(endpoint),
    };
  } else {
    throw new Error('HMAC credentials required to create S3 Client using HMAC');
  }

  console.info(' S3 Options Used: \n', s3Options);
  console.debug('\n\n ================== \n\n');
  return new IBMCOS.S3(s3Options);
};

const listObjects = async (s3, bucketName) => {
  const listObject = {
    Bucket: bucketName
  };
  console.info(' fetching object list \n', listObject);

  const data = await s3.listObjectsV2(listObject).promise();
  console.info(' Response: \n', JSON.stringify(data, null, 2));
  return data;
};
const listBuckets = async (s3, bucketName) => {
  const params = {
    Prefix: bucketName
  };
  console.error('\n Fetching extended bucket list to get Location');
  const data = await s3.listBucketsExtended(params).promise();
  console.info(' Response: \n', JSON.stringify(data, null, 2));

  return data;
};
const putObjects = async (s3, bucketName) => {
  const params1 = {
    Bucket: bucketName,
    Key: 'testObject1.'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+'txt',
    Body: 'Yayy!!! Your First Object uploaded into COS!!',
    Metadata: {
      fileType: 'sample'
    }
  };

  const params2 = {
    Bucket: bucketName,
    Key: 'testObject2'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    Body: 'Yayy!!! Your Second Object uploaded into COS!',
    Metadata: {
      fileType: 'sample'
    }
  };
  const params3 = {
    Bucket: bucketName,
    Key: 'testObject3'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
    Body: 'Yayy!! Your Third Object uploaded into COS!',
    Metadata: {
      fileType: 'sample'
    }
  };
  console.info(' putting Objects \n', params1, params2, params3);

  const data = await Promise.all([
    s3.putObject(params1).promise(),
    s3.putObject(params2).promise(),
    s3.putObject(params3).promise()
  ]);
  console.info(' Response: \n', JSON.stringify(data, null, 2));
  return true;
};

/*
 * Cloud Object Storage is available in 3 resiliency across many Availability Zones across the world.
 * Each AZ will require a different endpoint to access the data in it.
 * The endpoints url provides a JSON consisting of all Endpoints for the user.
 */
const getEndpoints = async (endpointsUrl) => {
  console.info('======= Getting Endpoints =========');

  const options = {
    url: endpointsUrl,
    method: 'GET'
  };
  const response = await rp(options);
  return JSON.parse(response);
};

/*
 * Once we have the available endpoints, we need to extract the endpoint we need to use.
 * This method uses the bucket's LocationConstraint to determine which endpoint to use.
 */
const findBucketEndpoint = (bucket, endpoints) => {
  const region = bucket.region || bucket.LocationConstraint.substring(0, bucket.LocationConstraint.lastIndexOf('-'));
  const serviceEndpoints = endpoints['service-endpoints'];
  const regionUrls = serviceEndpoints['cross-region'][region]
    || serviceEndpoints.regional[region]
    || serviceEndpoints['single-site'][region];

  if (!regionUrls.public || Object.keys(regionUrls.public).length === 0) {
    return '';
  }
  return Object.values(regionUrls.public)[0];
};

router.get('/getFiles', async(req, res)=>{

  try {
    /* Extract the serviceCredential and bucketName from the config.js file
     * The service credential can be created in the COS UI's Service Credential Pane
     */
    const { serviceCredential } = CONFIG;
    const { bucketName } = CONFIG;

    /* Create the S3 Client using the IBM-COS-SDK - https://www.npmjs.com/package/ibm-cos-sdk
     * We will use a default endpoint to initially find the bucket endpoint
     *
     * COS Operations can be done using an IAM APIKey or HMAC Credentials.
     * We will create the S3 client differently based on what we use.
     */
    let s3;
    if (!CONFIG.useHmac) {
      s3 = await getS3(defaultEndpoint, serviceCredential);
    } else {
      s3 = await getS3Hmac(defaultEndpoint, serviceCredential);
    }

    /* Fetch the Extended bucket Info for the selected bucket.
     * This call will give us the bucket's Location
     */
    const data = await listBuckets(s3, bucketName);
    const bucket = data.Buckets[0];

    /* Fetch all the available endpoints in Cloud Object Storage
     * We need to find the correct endpoint to use based on our bucjket's location
     */
    const endpoints = await getEndpoints(serviceCredential.endpoints);

    /* Find the correct endpoint and set it to the S3 Client
     * We can skip these steps and directly assign the correct endpoint if we know it
     */
    s3.endpoint = findBucketEndpoint(bucket, endpoints);

    /* Fetch the list of uploaded objects
     */
    const objectList = await listObjects(s3, bucketName);
    res.send({
      'Files':objectList
    })
  } catch (err) {
    console.error('Found an error in S3 operations');
    console.error('statusCode: ', err.statusCode);
    console.error('message: ', err.message);
    console.error('stack: ', err.stack);
    process.exit(1);
  }
});
router.get('/uploadFile', async(req,res)=>{
  let s3;
  const { serviceCredential } = CONFIG;
  const { bucketName } = CONFIG;
  if (!CONFIG.useHmac) {
    s3 = await getS3(defaultEndpoint, serviceCredential);
  } else {
    s3 = await getS3Hmac(defaultEndpoint, serviceCredential);
  }

  /* Fetch the Extended bucket Info for the selected bucket.
   * This call will give us the bucket's Location
   */
  const data = await listBuckets(s3, bucketName);
  const bucket = data.Buckets[0];

  /* Fetch all the available endpoints in Cloud Object Storage
   * We need to find the correct endpoint to use based on our bucjket's location
   */
  const endpoints = await getEndpoints(serviceCredential.endpoints);

  /* Find the correct endpoint and set it to the S3 Client
   * We can skip these steps and directly assign the correct endpoint if we know it
   */
  s3.endpoint = findBucketEndpoint(bucket, endpoints);

  /* Upload Objects into the selected bucket
   */
  const uploadFile = await putObjects(s3, bucketName);

  res.send({'status':uploadFile})

})

module.exports = router;
