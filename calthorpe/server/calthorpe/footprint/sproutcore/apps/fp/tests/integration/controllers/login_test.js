/* 
* UrbanFootprint-California, Scenario Planning Model
* 
* Copyright (C) 2012-2013 Calthorpe Associates
* 
* This program is free software: you can redistribute it and/or modify it under the terms of the
* GNU General Public License as published by the Free Software Foundation, version 3 of the License.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License along with this program.
* If not, see <http://www.gnu.org/licenses/>.
* 
* Contact: Calthorpe Associates (urbanfootprint@calthorpe.com)
* Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
* Phone: (510) 548-6800.      Web: www.calthorpe.com
* 
 */

// ==========================================================================
// Project:   Footprint.loginController Unit Test
// Copyright: @2012 My Company, Inc.
// ==========================================================================


module("Footprint.loginController", {
    setup: function() {
        setupApplicationForControllerTesting(
            {
                stateSetup: function() {
                    login = Footprint.store.find(SC.Query.local(Footprint.Login)).toArray()[0];
                    Footprint.loginContent.set('username', login.get('username'))
                    Footprint.loginContent.set('password', login.get('password'))
                }
            }
        );
    },

    teardown: controllerTeardown
});


test("Testing userController", function() {

    // Set the loginContent to simulate the form entry
    // Wait for the server
    stop(3000);
    setTimeout(function() {
        SC.RunLoop.begin();
        SC.RunLoop.end();
        assertStatus(Footprint.userController.content, Footprint.Record.READY_CLEAN, 'Footprint.userController');
        assertCurrentState(Footprint.LoadingApp);
        start();
    }, 1000);
});
