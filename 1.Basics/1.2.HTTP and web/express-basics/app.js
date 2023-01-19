const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

let counter = 0;
app.get('/counter', (req, res) => res.send(++counter + ''));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))