const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend();
const sns = new AWS.SNS();

module.exports.analyzeText = async (event) => {
  const s3Bucket = event.Records[0].s3.bucket.name;
  const s3Key = event.Records[0].s3.object.key;

  const textData = await s3.getObject({ Bucket: s3Bucket, Key: s3Key }).promise();
  const text = textData.Body.toString('utf-8');

  const params = {
    TextList: [text],
    LanguageCode: 'en'
  };

  const result = await comprehend.batchDetectSentiment(params).promise();
  
  const sentiment = result.ResultList[0].Sentiment;
  const score = result.ResultList[0].SentimentScore.Positive;

  if (sentiment === 'NEGATIVE' && score > 0.7) {
    await sns.publish({
      Message: `Alert: Negative sentiment detected in ATC communication!`,
      TopicArn: 'arn:aws:sns:us-west-2:123456789012:atc-alerts'
    }).promise();
  }
};

