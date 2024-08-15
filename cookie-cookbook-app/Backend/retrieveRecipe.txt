const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(event);
    console.log(event.queryStringParameters);
    const params = {
        TableName: 'cookies',
        Key: {
            'pk': event.queryStringParameters.recipeId
        }
    };
    
    try {
        const data = await dynamodb.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify('Recipe not found'),
            };
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
        
    } catch (err) {
        console.error('Error retrieving recipe from DynamoDB', err);
        return {
            statusCode: 500,
            body: JSON.stringify('Error retrieving Recipe from DynamoDB'),
        };
    }
};
