const Gree = require('gree-hvac-client');

module.exports = class GreeHVACClient {
    
    constructor(config) {
        this.config = config;
        this.properties = null;
        this.updatedProperties = null;
        this.client = new Gree.Client({host: this.config.hvacHost});
        
        this.client.on('connect', this.connect.bind(this));
        this.client.on('update', this.update.bind(this));
        this.client.on('no_response', this.noResponse.bind(this));
    }

    connect(client) {
        console.log('connected');
    }
    
    update(updatedProperties, properties) {
        console.log('Updated: ', updatedProperties);
        
        this.properties = properties;
        this.updatedProperties = updatedProperties;
    }
    
    noResponse() {
        console.log('noResponse');
    }
    
    getProperties() {
        return this.properties;
    }
    
    setProperty(property, value) {
        
        if (typeof Gree.PROPERTY[property] === 'undefined') {
            throw new Error(`Unknown property ${property}`);
        }
        
        this.client.setProperty(Gree.PROPERTY[property], value);
    }
}