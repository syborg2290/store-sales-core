const aws = require("aws-sdk");
const s3 = new aws.S3();
module.exports.putObjectToS3 = async function (params) {
    try {
        await s3.putObject(params).promise();
        return;
      } catch (error) {
        console.error("There was an error trying put resized images; originalKey:" + params.Key)
        console.error(error);
        return;
      }
}

module.exports.s3 = s3;
  