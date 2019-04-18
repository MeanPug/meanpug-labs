const Backbone = require('backbone');
const ActionLogsTpl = require('../templates/action-logs.ejs');

const ActionLog = Backbone.Model.extend({
    defaults: {
        message: null
    }
});

const ActionLogs = Backbone.Collection.extend({
    model: ActionLog
});

const ActionLogsView = Backbone.View.extend({
    template: ActionLogsTpl,

    initialize() {
        this.collection.on('add', this.render, this);
        this.render();
    },

    render() {
        this.$el.html(this.template({ logs: this.collection.models }));
    }
});

/**
 * starts polling for logs attached to the given process
 * @param pollInterval the interval (in ms) to poll for updates
 * @param processId The process for which we are polling for updates
 * @param cb Function to call when logs are retrieved
 */
const poll = function(pollInterval, processId, cb) {
    setInterval(() => {
        $.get('/api/logs', { processId })
            .then(resp => {
                cb(resp.messages);
            })
    }, pollInterval)
};

module.exports = { ActionLog, ActionLogs, ActionLogsView, poll };
