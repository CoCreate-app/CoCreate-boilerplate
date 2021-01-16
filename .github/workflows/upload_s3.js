console.log("Saving File in S3");

const S3 = require('aws-sdk/clients/s3')
const path = require('path');
var fs = require('fs');

console.log("Saving File in S3");
let s3 = new S3({
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECERTACCESSKEY,
})
const config = {
  Key: path.basename(process.env.DIST_FILE_NAME),
  Bucket: 'testcrudbucket',
  Body: fs.createReadStream(path.resolve(process.env.DIST_FILE_NAME)),
  ACL: 'public-read'
}
s3.upload(config, function(err, data) {
  console.log("File saved in S3")
  console.log(err, data)
})
