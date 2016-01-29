mandrill-webhook-mail-forwarder
=========

Node Module to send a mandrill formatted event to a specified email account via Mandrill

## Installation
```bash
$ npm install mandrill-mail-forwarder --save
```
## Usage

```javascript
var forwarder = require('mandrill-webhook-mail-forwarder');

var promises = mandrillEvents.map(function(event){
  return forwarder(event);
});

Q.all(promises).done(function(){});

```
The forwarder take an object in the format of a mandrill event as a parameter and returns a promise. The promise resolves when the mail is sent.

## Options

```javascript
var options = {
  forwardTo: 'address@to.forward.to',
  mandrillApiKey: 'Your mandrill api key'
};
```

  * **forwardTo:** the address you want to send the email message to
  * **mandrillApiKey:** Your mandrill api key

## Tests
```bash
$ npm test
```
## Links

  [api documentation](./docs/api.md)

  [jscs Report](./docs/jscs.md)

  [jshint Report](./docs/jshint.md)

## Contributing

  Use [Airbnb jscs style guide](https://github.com/airbnb/javascript).

  Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

  Not yet released.

## Legal Stuff

  mandrill-webhook-mail-forwarder is Copyright 2016 Aodhagán Collins. All Rights Reserved.

  Distributed under [MIT License](https://tldrlegal.com/license/mit-license).
