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

/***
 * The state that manages the projects pane at the top of the application
 * @type {Class}
 */
sc_require('states/edit_info_state');
sc_require('states/removing_states');
sc_require('controllers/scenarios/scenario_controllers');

Footprint.ShowingScenariosState = SC.State.extend({

    substatesAreConcurrent:YES,

    /***
     * Fired when a Scenario becomes active
     * @param context
     */
    doViewScenario: function(context) {
        this.gotoState('showingActiveScenarioState', context)
    },

    /***
     * Undo last Scenario CRUD operation
     * @param context
     */
    doUndo: function(context) {
        if (context.get('activeRecord')) {
            if (context.get('activeRecord').kindOf(Footprint.Scenario)) {
                Footprint.projectActiveController.get('childrenUndoManager').undo();
                return YES;
            }
        }
        return NO;
    },

    /***
     * Redo last Scenario CRUD operation
     * @param context
     */
    doRedo: function(context) {
        if (context.get('activeRecord')) {
            if (context.get('activeRecord').kindOf(Footprint.Scenario)) {
                Footprint.projectActiveController.get('childrenUndoManager').redo();
                return YES;
            }
        }
        return NO;
    },

    /***
     * Export the Scenario record in the context.
     * @param context - context.activeRecord contains the Scenario to export
     * @returns {*} YES if the context contains a Scenario, else NO
     */
    doExportRecord: function(context) {
        if (context.get('activeRecord')) {
            if (context.get('activeRecord').kindOf(Footprint.Scenario)) {
                // TODO export something!
                return YES;
            }}
        return NO;
    },


    /***
     * Called when the server-side analytic modules complete, instructing the ResultLibrary instance
     * and the mapController to refresh
     * @param context
     */
    analysisDidComplete: function(context) {

        var scenarios = Footprint.scenariosController.filter(function(scenario) {
            return scenario.get('id')==context.get('config_entity_id');
        });

        scenarios.forEach(function(scenario) {
            scenario.getPath('presentations.results').forEach(function(resultLibrary) {
                resultLibrary.refresh();
            }, this);
        }, this);
        // It works better to do this here than in the FeatureUpdatingState.
        // Polymaps gets angry if we do it there
        Footprint.mapController.refreshLayer();
    },

    /***
     * Called by socketIO when asynchronous creation of the instance's components completes
     */
    creationDidComplete: function(context) {
        // Refresh the Scenario ArrayController to sync the new record
        Footprint.scenariosController.get('content').refresh();
        // TODO I'm not sure what if anything more needs doing here
        /*
        var scenarios = Footprint.scenariosController.filter(function(scenario) {
            return scenario.get('id')==context.get('config_entity_id');
        });
        if (scenarios.length > 0) {
            scenarios.forEach(function(scenario) {
                scenario.refresh();
                scenario.getPath('presentations.results').forEach(function(resultLibrary) {
                    resultLibrary.refresh();
                }, this);
            }, this);
            return YES;
        }
        return NO;
        */
    },

    editingState:Footprint.EditInfoState.extend({
        editPanePath:'scenarioInfoView',
        editController:Footprint.scenarioEditController
    }),

    showingActiveScenarioState: SC.State.extend({
        enterState: function(context) {
            this.statechart.sendAction('doViewLayers');
        }
    }),

    removingState:Footprint.RecordRemovingState.extend({

        /***
         * Handles removing the Scenario record in the context. This updates the Scenario with its
         * deleted field set to true.
         * @param context - The context.activeRecord holds the record to remove
         */
        doRemoveRecord: function(context) {
            if (context.get('activeRecord')) {
                if (context.get('activeRecord').kindOf(Footprint.Scenario)) {
                    // Call sc_super with the context of the Scenario recordType
                    sc_super(SC.Object.create({
                        content: [context.get('activeRecord')], // Convert to array
                        recordType: Footprint.Scenario,
                        undoManager: Footprint.projectActiveController.get('childrenUndoManager')
                    }));
                    return YES;
                }}
            return NO;
        }
    }),

    /***
     * Handles undoing whatever CRUD operation the user last did on a Scenario
     */
    undoingState:Footprint.RecordUpdatingState.extend({
        recordsDidUpdate:function() {
            // Skip sc_super()
            // TODO maybe update layerSelection here
            Footprint.statechart.sendAction('doClearSelection');
        }
    })
});
