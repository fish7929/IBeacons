function BeaconManager() {
    var listeners = {
        'added': [],
        'removed': [],
        'updated': []
    };
    var beacons = [];

    function compareBeacons(a, b) {
		alert('3');
        return a.minor === b.minor && a.major === b.major;
    }

    function updateBeacons(newBeacons) {
		alert('2');
        var i, l, j, m, beacon1, beacon2, found;

        for(i= 0, l = newBeacons.length; i<l; i++) {
            beacon1 = newBeacons[i];
            found = false;

            for(j= 0, m=beacons.length; j<m; j++) {
                beacon2 = beacons[j];

                if(compareBeacons(beacon1, beacon2)) {
                    found = true;
                    trigger('updated', beacon1);
                    break;
                }
            }

            if(!found) {
                trigger('added', beacon1);
            }
        }

        for(i= 0, l = beacons.length; i<l; i++) {
            beacon1 = beacons[i];
            found = false;

            for(j= 0, m=newBeacons.length; j<m; j++) {
                beacon2 = newBeacons[j];

                if(compareBeacons(beacon1, beacon2)) {
                    found = true;
                    break;
                }
            }

            if(!found) {
                trigger('removed', beacon1);
            }
        }

        beacons = newBeacons;
    }

    function trigger(event, data) {
		alert('4');
        for(var i= 0, l=listeners[event].length; i<l; i++) {
            listeners[event][i](data);
        }
    }

    this.getBeacons = function() {
		alert('5');
        return beacons;
    };

    this.startPulling = function(interval) {
		alert('1');
        interval = interval || 1000;

        if(typeof interval !== "number" || isNaN(interval)) {
            throw "Interval must be a valid number.";
        }

        if(interval <= 0) {
            throw "Interval must be a positive number."
        }

        window.EstimoteBeacons.startRangingBeaconsInRegion(function () {
			alert('11');
            setInterval(function () {
                window.EstimoteBeacons.getBeacons(function (beacons) {
					alert('111');
                    updateBeacons(beacons);
                });
            }, interval);
        });
    };

    this.on = function(event, callback) {
		alert('6');
        if(!listeners[event]) {
            throw "Unknown event '" + event + "'";
        }

        if(typeof callback !== "function") {
            throw "Callback must be a function.";
        }

        listeners[event].push(callback);
    };
}