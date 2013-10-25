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
/*globals Footprint module test ok equals same stop start */


module("Footprint.policiesControllers", {
    setup: function() {
        setupApplicationForControllerTesting(
            {
                stateSetup: bypassLoginState
            }
        );
    },

    teardown: controllerTeardown
});

test("Testing policyCategoriesTreeController", function() {

    // Give the test enough time to complete the asynchronous timeout handlers
    stop(10000);

    setTimeout(function() {
        // Verify that PolicySet instances at the first level of the tree
        var policyCategories = Footprint.policyCategoriesTreeController.get('treeItemChildren');
        assertNonZeroLength(policyCategories, 'Footprint.policyCategoriesTreeController.arrangedObjects');
        assertKindForList(Footprint.PolicyCategory, policyCategories, 'Footprint.policyCategoriesTreeController.arrangedObjects');
        // Verify that Policy instances at the second level of the tree
        assertNonZeroLength(policyCategories[0].get('treeItemChildren'),
            'Footprint.policyCategoriesTreeController.treeItemChildren[0].treeItemChildren');
        assertKindForList(Footprint.Policy, policyCategories[0].get('treeItemChildren'),
            'Footprint.policyCategoriesTreeController.treeItemChildren[0].treeItemChildren');
        // Restart the main thread
        start();
    }, 2400);
});
