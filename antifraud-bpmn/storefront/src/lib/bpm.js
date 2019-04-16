const request = require('request-promise');

const launchProcess = function(engineUrl, processDefinitionKey, variables = {}) {
    const path = `/rest/process-definition/key/${processDefinitionKey}/start/`;
    const uri = engineUrl + path;

    console.log(`preparing POST to ${uri}`);

    const options = {
        uri,
        method: 'POST',
        body: {
            variables
        },
        json: true
    };

    return request(options);
};

module.exports = { launchProcess };
