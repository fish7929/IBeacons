/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$(document).ready(function(){
	//设置显示风格
	$("#afui").get(0).className = "ios"; 
	var beaconManager = new BeaconManager();
    var beaconsList = $('#ranging');
	beaconManager.startPulling(1000);
	beaconManager.on('updated', function(beacon){
		var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

		if(item) {
			item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatDistance(beacon.distance);
		}
	});
	beaconManager.on('added', function(beacon) {
		var item = document.createElement('li');
		item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatDistance(beacon.distance);
		item.id = 'beacon_' + beacon.major + '_' + beacon.minor;

		beaconsList.append(item);
	});
	beaconManager.on('removed', function(beacon) {
		var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

		if(item) {
			beaconsList.remove(item);
		}
	});
	beaconManager.startMonitoring();
});

//toFixed()方法可把 Number 四舍五入为指定小数位数的数字。
function formatDistance(meters) {
    if(meters > 1) {
        return meters.toFixed(3) + ' m';
    } else {
        return (meters * 100).toFixed(3) + ' cm';
    }
}
