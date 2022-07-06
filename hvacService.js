const yamlConfig = require('node-yaml-config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const CONFIG = yamlConfig.load(__dirname + '/config.yml');

const GreeHVACClient = require('./GreeHVACClient');

const greeHVACClient = new GreeHVACClient(CONFIG);

app.use(bodyParser.json());
app.disable('etag');

app.get('/properties', (req, res) => {
    const properties = greeHVACClient.getProperties();
    res.json(properties);
});

app.post('/properties', (req, res) => {
    try {
        for (const prop in req.body) {
            const value = req.body[prop];
            console.log(`prop[${prop}]=${value}`);
            greeHVACClient.setProperty(prop, value);
        }
        
        res.json(req.body);
    } catch (ex) {
        res.status(500).send(`Error: [${ex}]`);
    }
});

app.listen(CONFIG.httpPort, () => console.log(`Server listening on port: ${CONFIG.httpPort}`));