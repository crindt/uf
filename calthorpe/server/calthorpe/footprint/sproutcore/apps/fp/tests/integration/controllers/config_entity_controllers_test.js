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
// Project:   Footprint Unit Test
// Copyright: @2013 My Company, Inc.
// ==========================================================================

module("Footprint.scenarioController", {
    setup: function() {
        setupApplicationForControllerTesting(
            {
                stateSetup:bypassLoginState
            }
        );
    },

    teardown: function() {
        controllerTeardown();
    }
});

test("Testing scenarioController", function() {

    ok('test');
    // Give the test enough time to complete the asynchronous timeout handlers
    stop(20000);

    var timeout=0;
    setTimeout(function() {
        logStatus(Footprint.globalConfigController, 'Footprint.globalConfigController');
        assertStatus(Footprint.globalConfigController, Footprint.Record.READY_CLEAN, 'Footprint.globalConfigController');
    }, timeout+=2000);

    setTimeout(function() {
        logStatus(Footprint.regionsController, 'Footprint.regionsController');
        assertStatus(Footprint.regionsController, Footprint.Record.READY_CLEAN, 'Footprint.regionsController');
    }, timeout+=2000);

    setTimeout(function() {
        logStatus(Footprint.projectsController, 'Footprint.projectsController');
        assertStatus(Footprint.projectsController, Footprint.Record.READY_CLEAN, 'Footprint.projectsController');
    }, timeout+=2000);

    setTimeout(function() {
        logStatus(Footprint.scenariosController, 'Footprint.scenariosController');
        assertStatus(Footprint.scenariosController, Footprint.Record.READY_CLEAN, 'Footprint.scenariosController');
        start();
    }, timeout+=5000);

});
