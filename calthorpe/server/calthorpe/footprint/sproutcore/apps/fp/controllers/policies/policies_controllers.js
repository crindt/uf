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


sc_require('models/policy_models');
sc_require('controllers/scenarios/scenario_controllers');
sc_require('controllers/controllers');
sc_require('controllers/tree_content');
sc_require('controllers/tree_controller');

/***
 *
 * Organizes the BuiltForms by their tags.
 * @type {*|void
 */
Footprint.policyCategoriesTreeContent = Footprint.TreeContent.create({

    // The content exists in the context of a ConfigEntity. I'm not sure if this matters yet.
    configEntityBinding: SC.Binding.oneWay('Footprint.scenarioActiveController.content'),

    // The container object holding nodes
    nodeSetBinding: SC.Binding.oneWay('Footprint.policySetActiveController.content'),
    // The nodes of the tree
    nodesBinding: SC.Binding.oneWay('Footprint.policySetActiveController.policies'),

    // The toOne or toMany property of the node to access the keyObject(s). Here they are Tag instances
    keyProperty:'tags',
    // The property of the keyObject to use for a name. Here it the 'tag' property of Tag
    keyNameProperty:'tag',

    /**
     * Query for the keys of the tree
     * Query for all tags in the system, to which Policies might associate
     * TODO these tags should be limited to those used by Policies
     * TODO move to states
     */
    keyObjects: function() {
        //TODO move
        //return  Footprint.store.find(SC.Query.local(Footprint.Tag));
    }.property().cacheable()
});

Footprint.policyCategoriesTreeController = Footprint.TreeController.create({
    treeItemIsGrouped: YES,
    allowsMultipleSelection: NO
});

/***
 * The active policy, as dictated by the user's selection
 * @type {*}
 */
Footprint.policyActiveController = Footprint.TreeSelectionController.create({
    listController: Footprint.policyCategoriesTreeController
});

Footprint.policyEditController = SC.ObjectController.create({
    // Used to create new instances
    recordType: Footprint.Policy,
    // The bound object controller, which interacts with its content record directly, rather than via a nested store
    objectControllerBinding:'Footprint.policyActiveController',

    // Coerce single tag selection into the policy's tags collection
    // TODO the view control should support multiple selection
    tag: function(propKey, value) {
        if (value !== undefined) {
            this.get('tags').removeObjects(this.get('tags'));
            this.get('tags').pushObject(value);
        }
        else
            return this.get('tags').objectAt(0);
    }.property('*content.tags')

});

Footprint.policyControllers = Footprint.ControllerConfiguration.create({
    editController:Footprint.policyEditController,
    itemsController:Footprint.policyCategoriesTreeController,
    recordSetController:Footprint.policyCategoriesTreeController
});
