const statusCodes = {
    '200': 'OK',
    '204': 'No content',
    '400': 'Bad Request',
    '404': 'Not Found',
    '500': 'Internal Server error',
}
function processHttpRequest($method, $uri, $headers, $body) {
    let body = '';
    let statusCode = getStatusCode({ 'method': $method, 'uri': $uri, 'headers': $headers });
    if (statusCode === 200) {
        statusCode = isLoginExists(parseLoginFromBody($body))
        body = statusCode == 200 ? '<h1 style="color:green">FOUND</h1>' : statusCode === 204 ? '<h1 style="color:red">NOT FOUND USER DATA</h1>' : '';
    }

    const headers = {
        'Server': 'Apache/2.2.14 (Win32)',
        'Content-Length': body.toString().length,
        'Connection': 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
    };

    outputHttpResponse(statusCode, statusCodes[statusCode], headers, body);
}

function getStatusCode(request) {
    const validators = [validateMethod, validateURI, validateHeaders];
    let statusCode = 500;
    for (const key in validators) {
        if ((statusCode = validators[key](request)) !== 200)
            return statusCode;
    }
    return statusCode;
}

function validateURI(request) {
    return request.uri === '/api/checkLoginAndPassword' ? 200 : 404;
}

function validateHeaders(request) {
    return request.headers['Content-Type'] === 'application/x-www-form-urlencoded' ? 200 : 400;
}
function validateMethod(request) {
    return request.method === 'POST' ? 200 : 400;
}
function parseLoginFromBody(body) {
    return {
        'login': body.match(/login=([^&?]*)/)[1],
        'password': body.match(/password=([^&?]*)/)[1]
    }
}

function isLoginExists(userData) {
    try {
        return parseAuthValues(readFile())
            .find((element) => element.login == userData.login && element.password == userData.password) ? 200 : 404;
    } catch (error) {
        return 500;
    }
}
function readFile(file = './passwords.txt') {
    return require('fs').readFileSync(file, { encoding: 'utf8' }).split('\n');
}

function parseAuthValues(data) {
    return data.map((element) => {
        let values = element.split(':');
        return { 'login': values[0], 'password': values[1] };
    })
}

function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/\w+/)[0].trim().toUpperCase(),
        uri: string.match(/\/(\/?\w*)*(\?(&?\w+=[\w\d,+]+)+)?/)[0].trim(),
        headers: string.match(/^.+:.+$/gm).reduce((accumulator, current) => {
            let header = current.split(':');
            header[0] = header[0].toLowerCase().replace(/(?=\b)[a-z]/gm, (word) => word[0].toUpperCase()).trim();
            accumulator[header[0]] = header[1].trim();
            return accumulator;
        }, {}),
        body: string.match(/^(&?.*=.*)+$/gm).join().trim()
    }
}

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const output =
        `HTTP/1.1 ${statusCode} ${statusMessage}\n` +
        `${Object.keys(headers).reduce((accumulator, current) => accumulator + current + ': ' + headers[current] + '\n', '')}` +
        `\n${body}`
    console.log(output);
}

const testRequest = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345
`
const parsed = parseTcpStringAsHttpRequest(testRequest);
processHttpRequest(parsed.method, parsed.uri, parsed.headers, parsed.body);
