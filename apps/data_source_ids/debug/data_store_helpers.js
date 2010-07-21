/*globals statusEquals*/      // make jslint happy

// Helper function to convert status number to a string
// this was taken from SC.Record#statusString
SC.Record.mixin({
  statusString: function(status) {
    var ret = [];

    for(var prop in SC.Record) {
      if(prop.match(/[A-Z_]$/) && SC.Record[prop]===status) {
        ret.push(prop);
      }
    }

    return ret.join(" ");  
  }
});

// Helper function to make it easier to track down status errors
statusEquals = function(obj, status, message){
  equals(SC.Record.statusString(obj.get('status')), SC.Record.statusString(status), message);	
};

var nStops = 0;

function pushStop(t) {  
  if (nStops === 0) stop(t);
  nStops++;
}

function popStart() {
  if (nStops < 1) throw 'popped too many starts';
  nStops--;
  if (nStops === 0) start();
}
  
function testAfterPropertyChange(target, property, testFn) {
  if (target && target.addObserver) { 
    // give a healthy 10s timeout to discourage anyone from depending on a timeout to signal failure
    pushStop(10000);   
  }
  else {
    ok(false, 'testAfterPropertyChange: target is empty or does not have addObserver property.');
    throw 'testAfterPropertyChange: target is empty or does not have addObserver property';
  }
  
  function observer() {
    target.removeObserver(property, observer);
    try {
      testFn();
    }
    catch (e) {
      CoreTest.plan.error('Error during testAfterPropertyChange! See console log for details.', e);
      console.error(e);
      popStart();
      // it is better not to throw the exception here
      // exceptions thrown in observers cause hard to find problems, the observed object won't send out
      // future notifications because its notification code will be left in a bad state. 
      // (see the 'level' variable used in observable)
      return;
    }
    popStart();
  }
  target.addObserver(property, observer);
}

function afterStatusChange(target, testFn) {
  testAfterPropertyChange(target, 'status', testFn);
}
