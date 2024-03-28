const aws = require("aws-sdk")

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams =  {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const updateUsers = async (event, context) => {

    let userId = event.pathParameters.id

    const body = JSON.parse(event.body)

    var params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: 'set #age = :age, #address = :address',
        ExpressionAttributeNames: { '#age' : 'age', '#address' : 'address'},
        ExpressionAttributeValues:
            { ':age' : body.age, ':address' : body.address},
        ReturnValues: 'ALL_NEW'
    };

    return dynamodb.update(params).promise().then(res => {
        console.log(res)
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': res.Attributes })
        }
    })
}

module.exports = {
    updateUsers
}