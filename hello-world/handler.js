
const hello = async (event, context) => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': 'Hello world', 'hour': hour, 'minute': minute, 'second': second, 'event': event, 'context': context }),
    }
}

module.exports = {
    hello
}
