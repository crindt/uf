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
 * The Footprint Statechart. This extends SC.Statechart, which is a simple class that mixes in SC.StatechartManager
 * See SC.StatechartManager to understand or add functionality to this class.
 * @type {*}
 */
Footprint.Statechart = SC.Statechart.extend({
    trace: YES,
    initialState: 'applicationReadyState',

    // Initial load state
    applicationReadyState: SC.State.plugin('Footprint.ApplicationReadyState'),
    // Login state
    loggingInState: SC.State.plugin('Footprint.LoggingInState'),
    // Loading state, which loads all configuration data required to show the app
    loadingAppState: SC.State.plugin('Footprint.LoadingAppState'),
    // Main application state, which delegates different sections of the application to substates
    showingAppState: SC.State.plugin('Footprint.ShowingAppState'),
    /***
     * Communication to all the statechart's current states, which are handled by the first state that expects
     * that event, and otherwise sent to the state's child states until a handler is found.
     * We broadcasting events of a controller's status
     * The event name is always in the form controllerInstanceNameIsStatusString where status string is capital camel case
     */
    sendStatusEvent: function(controller, controllerName) {
        this.sendEvent('%@Is%@'.fmt(controllerName, getStatusString(controller.get('status')).toLowerCase().camelize().capitalize()));
    }
});

Footprint.statechart = Footprint.Statechart.create({
});

Footprint.State = SC.State.extend({
    sendStatusEvent: function(controller, controllerName) {
        this.statechart.sendStatusEvent(controller, controllerName);
    },

    /***
     * Returns the current state of the given name
     * @param stateName
     * @returns {*}
     */
    currentState: function(stateName) {
        return Footprint.statechart.currentStates().filter(function(state) {
            return state=="showingApp.%@".fmt(stateName);
        }).firstObject();
    },

    /***
     * The default behavior of enterState is to make the stateView visible, if it exists
     */
    enterState: function() {
    },

    /***
     * The default behavior of existState is to make the stateView visible, if it exists
     */
    exitState: function() {
    }
});
