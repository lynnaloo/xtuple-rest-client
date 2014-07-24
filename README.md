
## xTuple ERP Node.js REST API Client Library using the Google APIs Client Library for Node.js

xTuple ERP Node.js [REST API](https://github.com/xtuple/xtuple/wiki/xTuple's-REST-API) Client Library using the Google APIs Client Library for Node.js. For more information about [xTuple](http://www.xtuple.com)'s web application, look at the [source code](https://github.com/xtuple/xtuple/wiki/xTuple's-REST-API). 

## Usage:

### Create new OAuth2 Client in xTuple

Before you can use this client with xTuple's OAuth 2.0 Server,
you need to install the OAuth 2.0 extension in your xTuple application
and create a reference for a new OAuth 2.0 Client. Be sure to select a "Client Type"
of "Service Account" and ensure that "Delegated Access" is checked. This will generate a
private key and give you all the other information that you wll need to connect to the xTuple REST API.

### Installation

Clone this repository and run `npm install`

or `npm install xtuple-rest-client`

### Set your Private Key

Convert your key.p12 file to key.pem and copy it to the `keys` folder:

`openssl pkcs12 -in keys/key.p12  -nocerts -nodes | openssl rsa -out keys/key.pem`

This key and the folder are in the .gitignore and should never be committed to source control.

Enter Import Password: 'notasecret'

### Setup Environment Variables

`cp sample.env .env`

Open the .env file and change the information to match what was provided by the xTuple OAuth 2.0 extension.
This .env file should also never be committed to source control.

### Example Use

```javascript
var _ = require('underscore'),
  Client = require('xtuple-rest-client');

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
```
