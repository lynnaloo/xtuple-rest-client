var _ = require('underscore'),
  Client = require('./index');

new Client(function (client) {
  client.query({
    type: 'ToDo',
    method: 'list',
    params: { maxResults: 50 },
    callback: function (err, result) {
      if (err) {
        console.log('Error:', err);
      }
      if (result) {
        console.log('To Dos:');
        _.map(result.data.data, function (obj) {
          console.log('Id:', obj.uuid);
          console.log('Name:', obj.name);
          console.log('Description:', obj.description);
        });
      }
    }
  });
});
