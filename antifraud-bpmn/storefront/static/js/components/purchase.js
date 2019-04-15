const Purchase = Backbone.Model.extend({
    defaults: {
        name: null,
        price: 0,
        processId: null,
        processUrl: null
    },

    url: '/api/purchase'
});

module.exports = Purchase;
