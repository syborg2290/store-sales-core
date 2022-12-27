"use strict";

const sharp = require("sharp");
const { updateStockImage } = require("./services/stocks/updateStockImage");
const { modifyKey } = require("./utils/modifyKey");
const { putObjectToS3, s3 } = require("./utils/putObjectToS3");

module.exports.processImage = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const originalImageKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  const fileName = originalImageKey.split('/').pop();
  const [stockId, stockImageId] = fileName.split('---');

  const params = {
    Bucket: bucket,
    Key: originalImageKey,
  };

  let originalImage;
  try {
    originalImage = await s3.getObject(params).promise();
  } catch (error) {
    console.error(error);
    return;
  }
  console.log(originalImageKey)
  let resizedBuffer = await sharp(originalImage.Body).resize(400).toBuffer();
  const smallImageKey = modifyKey(originalImageKey, "small-size");
  let newParams = {
    Bucket: bucket,
    Key: smallImageKey,
    Body: resizedBuffer,
    ContentType: "image",
  };
  await putObjectToS3(newParams);
  resizedBuffer = await sharp(originalImage.Body).resize(600).toBuffer();
  const mediumImageKey = modifyKey(originalImageKey, "medium-size");
  newParams = {
    Bucket: bucket,
    Key: mediumImageKey,
    Body: resizedBuffer,
    ContentType: "image",
  };
  await putObjectToS3(newParams);
  resizedBuffer = await sharp(originalImage.Body).resize(800).toBuffer();
  const largeImageKey = modifyKey(originalImageKey, "large-size");
  newParams = {
    Bucket: bucket,
    Key: largeImageKey,
    Body: resizedBuffer,
    ContentType: "image",
  };
  await putObjectToS3(newParams);

  try {
    const stockImageData = {
      mainKey: originalImageKey,
      largeSizeKey: largeImageKey,
      mediumSizeKey: mediumImageKey,
      smallSizeKey: smallImageKey,
      stockId
    };
    await updateStockImage(stockImageId, stockImageData);

    console.log("Successfully resized");
    return;
  } catch (error) {
    if(error.response) console.log(error.response)
    console.error("There was an error with http request to inventory API");
    console.error(error);
  }
};
