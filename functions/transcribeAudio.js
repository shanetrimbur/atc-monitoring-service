const AWS = require('aws-sdk');
const transcribe = new AWS.TranscribeService();

module.exports.transcribeAudio = async (event) => {
  const s3Bucket = event.Records[0].s3.bucket.name;
  const s3Key = event.Records[0].s3.object.key;

  const params = {
    TranscriptionJobName: `transcription-${Date.now()}`,
    LanguageCode: 'en-US',
    MediaFormat: 'mp3',
    Media: {
      MediaFileUri: `s3://${s3Bucket}/${s3Key}`
    },
    OutputBucketName: 'atc-transcripts-bucket'
  };

  await transcribe.startTranscriptionJob(params).promise();
};

