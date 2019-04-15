const request = require('request-promise');

const launchProcess = function(engineUrl, processDefinitionId, variables = {}) {
    const path = `/rest/process-definition/${processDefinitionId}/start/`;
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
