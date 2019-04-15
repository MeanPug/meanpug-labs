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

module.exports = { ActionLog, ActionLogs, ActionLogsView };
