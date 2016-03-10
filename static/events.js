(function($) {
  'use strict';

  var ACOS = function() {};

  ACOS.sendEvent = function(event, payload) {

    var protocolData = {
      "usr": $('input[name="acos-usr"]').attr('value'),
      "grp": $('input[name="acos-grp"]').attr('value'),
      "sid": $('input[name="acos-sid"]').attr('value'),
      "example-id": $('input[name="acos-example-id"]').attr('value'),
      "app": $('input[name="acos-app"]').attr('value')
    };

    var target = window.location.pathname;
    if (target[target.length - 1] == '/') {
      target = target.substring(0, target.length - 1);
    }

    var data = {
      "event": event,
      "payload": JSON.stringify(payload),
      "protocolData": JSON.stringify(protocolData)
    };

    if (event === 'log' && window.AcosLogging && AcosLogging.logkey && AcosLogging.loggingSession) {
      data.logkey = AcosLogging.logkey;
      data.loggingSession = AcosLogging.loggingSession;
    }

    if (event === 'log' && window.AcosLogging && AcosLogging.noLogging) {
      return;
    } else {
      $.post(target + "/event", data);
    }

  };

  // Make the namespace globally available
  window.ACOS = ACOS;

}(jQuery));