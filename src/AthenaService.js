const athenaClient = require('athena-client')

class AthenaService {
    constructor() {
        if (!process.env.ATHENA_BUCKET_URI || !process.env.AWS_REGION) {
            throw new InternalException('AWS_ATHENA_BUCKET_URI and AWS_REGION must be configured');
        }

        const clientConfig = {
            bucketUri: process.env.ATHENA_BUCKET_URI,
        };

        const awsConfig = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            region: process.env.AWS_REGION,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
        };

        this.athena = athenaClient.createClient(clientConfig, awsConfig);
    }
}

module.exports = AthenaService