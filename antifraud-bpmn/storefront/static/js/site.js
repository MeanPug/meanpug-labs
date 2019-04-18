const { ActionLog, ActionLogs, ActionLogsView, poll } = require('./components/action-logs');
const Purchase = require('./components/purchase');
const ProductView = require('./components/products');

const logs = new ActionLogs();
new ActionLogsView({ el: '.ActionLog__list', collection: logs });

const purchase = new Purchase();
$('.Product').each(function() {
    new ProductView({ model: purchase, el: $(this).get(0) });
});

purchase.on('change:processId', function() {
    console.log(`process ID is now ${purchase.get('processId')}`);

    logs.add(purchase.get('messages').map(message => new ActionLog({ message })));

    poll(3000, purchase.get('processId'), messages => logs.add(messages.map(message => new ActionLog({ message }))));
});
