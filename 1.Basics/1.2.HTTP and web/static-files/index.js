const statusCodes = {
    '200': 'OK',
    '204': 'No content',
    '400': 'Bad Request',
    '404': 'Not Found',
    '500': 'Internal Server error',
}
const allowedHosts = {
    'student.shpp.me': 'student',
    'another.shpp.me': 'another',
}
function processHttpRequest($method, $uri, $headers, $body) {
    let test = $uri;
    let body = '';
    let statusCode = getStatusCode({ 'method': $method, 'uri': $uri, 'headers': $headers });
    if (statusCode === 200) {
        let result = getStaticFile($headers['Host'], $uri);
        statusCode = result.statusCode;
        body = result.body;
    }
    const headers = {
        'Server': 'Apache/2.2.14 (Win32)',
        'Content-Length': body.toString().length,
        'Connection': 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
    };

    outputHttpResponse(statusCode, statusCodes[statusCode], headers, body);
}

function getStaticFile(host, filePath) {
    try {
        let file = readFile(`./${allowedHosts[host]}${filePath.match(/(\/\w+)*([^=]\/?\w+.\w+)$/)[0]}`);
        return { statusCode: 200, body: file }
    } catch (error) {
        return { statusCode: 404, body: '' };
    }
}

function readFile(path) {
    return require('fs').readFileSync(path, { encoding: 'utf-8' });
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
function validateMethod(request) {
    return request.method === 'GET' ? 200 : 400;
}
function validateHeaders(request) {
    return Object.keys(allowedHosts).includes(request.headers['Host']) ? 200 : 404
}
function validateURI(request) {
    return /(\/\w+)*([^=]\/?\w+.\w+)$/.test(request.uri) ? 200 : 400;
}

function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/\w+/)[0].trim().toUpperCase(),
        uri: string.match(/\/(\/?[\w.]*)*(\?(&?\w+=[\w\d,+]+)+)?/g)[0].trim(),
        headers: string.match(/^.+:.+$/gm).reduce((accumulator, current) => {
            let header = current.split(':');
            header[0] = header[0].toLowerCase().replace(/(?=\b)[a-z]/gm, (word) => word[0].toUpperCase()).trim();
            accumulator[header[0]] = header[1].trim();
            return accumulator;
        }, {}),
    }
}

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const output =
        `HTTP/1.1 ${statusCode} ${statusMessage}\n` +
        `${Object.keys(headers).reduce((accumulator, current) => accumulator + current + ': ' + headers[current] + '\n', '')}` +
        `\n${body}`
    console.log(output);
}

const testRequest = `GET /inner/test.txt HTTP/1.1
Host:student.shpp.me
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0`;

const parsed = parseTcpStringAsHttpRequest(testRequest);
processHttpRequest(parsed.method, parsed.uri, parsed.headers, parsed.body);