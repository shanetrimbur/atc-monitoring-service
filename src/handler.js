module.exports.handler = async () => {
  const axios = require('axios');
  const fs = require('fs');
  const AWS = require('aws-sdk');

  const s3 = new AWS.S3();

  const audioUrl = 'https://www.liveatc.net/search/?icao=KNKX';
  const timestamp = new Date().toISOString();
  const fileName = `audio_${timestamp}.mp3`;

  const response = await axios({ url: audioUrl, responseType: 'stream' });
  const tempFilePath = `/tmp/${fileName}`;

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(tempFilePath);
    response.data.pipe(writeStream);

    writeStream.on('finish', async () => {
      try {
        await s3.putObject({
          Bucket: 'atc-audio-bucket',
          Key: fileName,
          Body: fs.createReadStream(tempFilePath)
        }).promise();
        resolve(`File uploaded successfully: ${fileName}`);
      } catch (error) {
        reject(`Failed to upload file: ${error.message}`);
      }
    });

    writeStream.on('error', (error) => {
      reject(`Error writing file to disk: ${error.message}`);
    });
  });
};
