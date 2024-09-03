# atc-monitoring-service

ATC (Air Traffic Control) Monitoring Service
Project Overview

The ATC Monitoring Service is a serverless application designed to process and analyze audio files using AWS Lambda, S3, and other AWS services. This system automates the workflow of fetching audio data, transcribing it, analyzing the text, and sending notifications based on the processed data. The application is intended to help monitor and manage air traffic control (ATC) communications more efficiently.
Current Status

The project is in the development phase, and several AWS Lambda functions have been successfully deployed and tested. The system utilizes multiple AWS services, including S3 for storage, SQS for queuing, and CloudWatch for logging and monitoring.
Successfully Deployed and Tested Components

    fetchAudioFunction: This Lambda function is responsible for fetching audio files and uploading them to the S3 bucket. It has been tested and confirmed to work correctly, as indicated by successful executions in the AWS Lambda console.

    S3 Bucket (atc-audio-bucket): This bucket is used to store the audio files processed by the fetchAudioFunction. The necessary IAM policies have been attached to allow S3 operations, and the function is able to upload files successfully.

Issues Encountered

    Handler Configuration Errors:
        Several Lambda functions, such as atc-monitoring-service-dev-notify and atc-monitoring-service-dev-analyzeText, are experiencing issues related to incorrect handler configurations.
        Error Example: Runtime.HandlerNotFound: Handler 'index.handler' is undefined or not exported.
        Resolution Attempted: The handler configuration has been reviewed and adjusted, but the issue persists. This suggests there might be problems with how the handler function is exported or how the deployment package was structured.

    Module Import Errors:
        Functions are also facing issues with missing modules, particularly with the notify module.
        Error Example: Runtime.ImportModuleError: Error: Cannot find module 'notify'.
        Resolution Attempted: Attempts to install the required module using npm install notify have resulted in errors, possibly due to incorrect or missing dependencies in the environment.

Next Steps

    Resolve Handler Issues:
        Review the codebase for each Lambda function to ensure that the handler functions are correctly defined and exported.
        Ensure that the correct file is specified in the Lambda configuration and that it matches the deployed package.

    Fix Module Import Errors:
        Investigate the notify module installation issues and ensure that all necessary dependencies are correctly installed and included in the deployment package.
        Consider using a different method for notifications if the notify module continues to cause issues.

    Comprehensive Testing:
        Continue testing each Lambda function individually and as part of the overall workflow to ensure all components interact as expected.
        Use AWS CloudWatch logs for detailed error analysis and troubleshooting.

    Documentation and Collaboration:
        Update this README and any other documentation to reflect the current state of the project and any known issues.
        Collaborate with team members to debug the existing issues and brainstorm potential solutions.

How It Works

    Lambda Functions:
        fetchAudioFunction: Fetches audio files and uploads them to the S3 bucket.
        transcribeAudioFunction: Processes the audio files to generate transcripts (currently being debugged).
        analyzeTextFunction: Analyzes the text from transcriptions for specific keywords or phrases (currently facing handler issues).
        notifyFunction: Sends notifications based on the analysis results (currently facing module import issues).

    S3 (atc-audio-bucket):
        Stores the audio files processed by the Lambda functions.
        The bucket has been configured with appropriate IAM policies to allow Lambda functions to interact with it.

    SQS (atc-notification-queue):
        Queues messages related to the analysis and notification process.

    IAM Roles:
        IAM roles have been configured with specific policies to allow the necessary actions (e.g., s3:PutObject, sqs:ReceiveMessage).

Known Issues and Resolutions

    Handler Configuration: Ensure that handler functions are correctly named and exported.
    Module Import: Investigate and resolve module installation issues, specifically with the notify module.
    Testing: Continue thorough testing to identify and resolve any additional issues.
