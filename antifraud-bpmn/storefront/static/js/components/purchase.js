const Purchase = Backbone.Model.extend({
    defaults: {
        name: null,
        price: 0,
        processId: null,
        messages: []
    },

    url: '/api/purchase'
});

module.exports = Purchase;
