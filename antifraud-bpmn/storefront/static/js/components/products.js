const Backbone = require('backbone');

const ProductView = Backbone.View.extend({
    events: {
        'click .btn-buy': 'triggerPurchase'
    },

    triggerPurchase(evt) {
        const name = this.$el.find('.Product__name').text();
        const price = this.$el.find('.Product__price').data('val');

        this.model.set({ name, price });
        this.model.save();
    }
});

module.exports = ProductView;
