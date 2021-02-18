const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button>submit</button></form></body>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/thankyou');
                return res.end();
            });
        });
    }

    if (url === '/thankyou') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>fuck</h1>');
        res.end();
    }

}
 module.exports = requestHandler;