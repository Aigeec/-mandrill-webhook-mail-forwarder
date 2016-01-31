mandrill-webhook-mail-forwarder
=========

A express compatible middleware Node Module to send a list mandrill formatted events to a specified email account via Mandrill.

## Installation
```bash
$ npm install mandrill-webhook-mail-forwarder--save
```
## Usage

This module

```javascript
var forwarder = require('mandrill-webhook-mail-forwarder');

app.use(forwarder(options));

```
The forwarder expects the events to be available at req.mandrillEvents. The events should be in the format of a mandrill event. Will call next when all mails are sent.

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
