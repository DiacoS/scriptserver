const express = require('express');
const fs = require('fs-extra');
const EventEmitter = require('events');
const path = require('node:path');
const app = express();
const port = '4000'

const eventEmitter = new EventEmitter();

eventEmitter.on('log',(message) => {
    console.log(`Log message: ${message}`);
})

eventEmitter.emit('log', 'this is a log message');

app.use((req, res, next) => {
    console
    const logMessage = `${req.method} ${req.url} `;
    eventEmitter.emit('log', logMessage);
    next
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/read-file', async (req, res) =>{
    const  filePath = path.join(__dirname, 'data.txt');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.send(data)

    } catch (err) {
        eventEmitter.emit ('log', `Error while reading file: ${err.message}`);
        res.status(500).send('Error while reading file');
    }
})

app.post('/write-file', async (req, res) =>{
    const filePath = path.join(__dirname,'data.txt');
    const fileContent = req.body.content;

    if (!fileContent) {
        eventEmitter.emit('log', 'file has been updated!');
        return res.status(400).send('data has not been received!');
    }
    try {
        await fs.writeFile(filePath, fileContent, 'utf8');
        eventEmitter.emit('log', ' file has been updated!')
        res.send('File has been updated')
    } catch (err) {
        eventEmitter.emit('log', 'File has been updated!');
        res.send(500).send('Error while reading file');
    }
});
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)

});

