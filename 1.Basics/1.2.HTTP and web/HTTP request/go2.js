// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
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

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));