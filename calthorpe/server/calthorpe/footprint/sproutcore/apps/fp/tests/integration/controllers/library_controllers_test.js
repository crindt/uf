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

/**
 * Test the controllers manage the library of DbEntityInterests of the active ConfigEntity, and possibly other libraries, such as lists of charts, etc.
 */
module("Footprint.layLibraryControllers", {
    setup: function() {
        setupApplicationForControllerTesting(
            {
                stateSetup:bypassLoginState
            }
        );
    },

    teardown: controllerTeardown
});

test("Testing layersController", function() {

    // Give the test enough time to complete
    stop(30000);
    var params = {
        controllers: Footprint.layerControllers,
        controllersPath: 'Footprint.layersControllers',
        recordType: Footprint.PresentationMedium
    };
    Footprint.TestForLaryLibraryControllers = testListController(params);

    setTimeout(function() {
        // We exepct one PresentationMedium per db_entity
        var expectedLength = Footprint.scenarioActiveController.getPath('content.db_entities').length;
        ok(expectedLength > 0, "No DbEntities found for the active ConfigEntity");
        assertLength(
            expectedLength,
            Footprint.layersController.get('content'),
            'Footprint.layersController.content');
        assertKindForList(
            Footprint.PresentationMedium,
            Footprint.layersController.get('content'),
            'Footprint.layersController.content');
        // Restart the main thread
        start();
    }, 8000);
});


