
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const output = `HTTP/1.1 ${statusCode} ${statusMessage}\n${Object.keys(headers)
        .reduce((accumulator, current) =>
            accumulator + current + ' : ' + headers[current] + '\n', '')}\n${body}`;
    console.log(output);
}

function processHttpRequest($method, $uri, $headers, $body) {
    const statusCodes = {
        '200': 'OK',
        '400': 'Bad Request',
        '404': 'Not Found'
    };
    const statusCode = $method !== 'GET' ? 400 : !(/^\/sum.*/.test($uri) ? 404 : !(/\?nums=(,?\d)+/).test($uri)) ? 400 : 200;
    const statusMessage = statusCodes[statusCode];
    const body = statusCode === 200
        ? $uri.match(/[^(nums=)](,?\d)+/g)[0]
            .split(',')
            .reduce((accumulator, current) => +accumulator + +current, 0)
        : statusCodes[statusCode]

    const headers = {
        'Date': new Date(),
        'Server': 'Apache / 2.2.14 (Win32)',
        'Connection': 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': body.toString().length,
    };
    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function parseTcpStringAsHttpRequest(string) {
    return {
        method: string.match(/\w+/)[0].trim(),
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

const testRequest = `GET /sum?nums=1,2,3 HTTP/1.1
Host: student.shpp.me`;

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
