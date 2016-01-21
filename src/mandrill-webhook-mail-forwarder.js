(function() {
  'use strict';

  var Q = require('bluebird');
  var _ = require('lodash');
  var mandrill = require('mandrill-api/mandrill');

  var MailForwarder = function(options) {

    if (!(this instanceof MailForwarder)) {
      return new MailForwarder(options);
    }

    options = options || {};

    if (!options.forwardTo || !options.mandrillApiKey) {
      throw new Error('Configuration is incomplete. Please see documentation.');
    }

    var mandrillClient = new mandrill.Mandrill(options.mandrillApiKey);

    var forwardEmail = function(event) {

      var deferred = Q.defer();

      if (_.includes(options.dontForwardEmailsFrom, event.msg.from_email)) {
        deferred.resolve();
      } else {

        event.msg.to = [{ email: options.forwardTo }];

        var sendSuccess = function(result) {
          deferred.resolve(result);
        };

        var sendError = function(e) {
          deferred.reject(e);
        };

        mandrillClient.messages.send({ message: event.msg }, sendSuccess, sendError);
      }

      return deferred.promise;
    };

    return forwardEmail;
  };

  module.exports = MailForwarder;

})();
