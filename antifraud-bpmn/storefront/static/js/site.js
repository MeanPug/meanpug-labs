const { ActionLog, ActionLogs, ActionLogsView } = require('./components/action-logs');
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

    logs.add(new ActionLog({
        message: `Process with ID ${purchase.get('processId')} launched`
    }));

    logs.add(new ActionLog({
        message: `Visit URL <a href="${purchase.get('processUrl')}">${purchase.get('processUrl')}</a> to explore workflow`
    }));
});

