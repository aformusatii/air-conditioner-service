const yamlConfig = require('node-yaml-config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const CONFIG = yamlConfig.load(__dirname + '/config.yml');

const GreeHVACClient = require('./GreeHVACClient');

const greeHVACClient = new GreeHVACClient(CONFIG);

let globalProperties;

app.use(bodyParser.json());
app.disable('etag');

app.get('/properties', (req, res) => {
    globalProperties = greeHVACClient.getProperties();
    res.json(globalProperties);
});

app.post('/properties', (req, res) => {
    try {
        console.log('================================');
        for (const prop in req.body) {
            const newValue = req.body[prop];
            const oldValue = globalProperties[prop];

            if (newValue !== oldValue) {
                console.log(`prop[${prop}]=${newValue}`);
                globalProperties[prop] = newValue;
            }


            //greeHVACClient.setProperty(prop, value);
        }
        
        res.json(req.body);
    } catch (ex) {
        res.status(500).send(`Error: [${ex}]`);
    }
});

app.use(express.static('static'))

app.listen(CONFIG.httpPort, () => console.log(`Server listening on port: ${CONFIG.httpPort}`));