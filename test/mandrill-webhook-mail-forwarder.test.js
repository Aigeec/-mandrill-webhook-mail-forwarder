(function() {
  'use strict';
  /*jshint expr: true*/

  var proxyquire =  require('proxyquire');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;
  chai.use(sinonChai);
  var mandrillStub = {};

  var config = {
    forwardTo: 'test@example.com',
    mandrillApiKey: 'some_api_key',
    dontForwardEmailsFrom:  ['black@listed.email'],
  };

  var send = sinon.spy(function(event, onSuccess, onError) {
    onSuccess();
  });

  mandrillStub.Mandrill = function(options) {
    return {
        messages: {
          send: send,
        },
      };
  };

  var forwarder = proxyquire('../src/mandrill-webhook-mail-forwarder', { 'mandrill-api/mandrill': mandrillStub });

  beforeEach(function() {
    send.reset();
  });

  describe('#mandrill-webhook-mail-forwarder', function() {

    it('should take a configuration', function() {
      expect(forwarder.length).to.equals(1);
    });

    it('should return a function that takes a single event parameter', function() {
      expect(forwarder(config).length).to.equals(1);
    });

    describe('it validates it configuration', function() {

      it('should check for a forwardTo property', function() {
        var testFunction = function() { forwarder(); };

        expect(testFunction).to.throw(Error, /Configuration is incomplete/);
      });

      it('should check for a mandrillApiKey property', function() {
        var testFunction = function() { forwarder({ forwardTo: 'test@example.com' }); };

        expect(testFunction).to.throw(Error, /Configuration is incomplete/);
      });

    });

    it('should send a message for each event that is not blacklisted', function(done) {
      forwarder(config)({ msg: {} }).then(function() {
        expect(send).to.have.been.calledOnce;
      }).done(done);
    });

    it('does not forward emails from senders that are blacklisted', function(done) {
      forwarder(config)({ msg: { from_email: 'black@listed.email' } }).then(function() {
        expect(send).not.to.have.been.called;
      }).done(done);
    });

    it('should reject the promise with the error if the mail fails to send', function(done) {

      var successSpy = sinon.spy();
      var errorSpy = sinon.spy();

      mandrillStub.Mandrill = function(options) {
        return {
            messages: {
              send: function(event, onSuccess, onError) {
                onError(new Error('Message sending failed'));
              },
            },
          };
      };

      var forwarder = proxyquire('../src/mandrill-webhook-mail-forwarder', { 'mandrill-api/mandrill': mandrillStub });

      forwarder(config)({ msg: { } }).then(successSpy, errorSpy).done(function() {
        expect(errorSpy).to.have.been.calledOnce;
        expect(errorSpy.args[0][0].message).to.equals('Message sending failed');
        expect(successSpy).not.to.have.been.called;
        done();
      });
    });

  });
})();
