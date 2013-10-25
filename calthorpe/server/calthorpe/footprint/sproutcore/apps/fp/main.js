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

sc_require('object_extensions');
sc_require('state_extensions');
sc_require('controllers/controller_extensions');
sc_require('many_array_extensions');

// These need to load in the specified order
sc_require('resources/jquery_ui/jquery_ui_core');
sc_require('resources/jquery_ui/widget');
sc_require('resources/jquery_ui/colorpicker');
sc_require('resources/jquery_ui/mouse');
sc_require('states/socketIO');

Footprint.main = function main() {
    Footprint.statechart.initStatechart();
    // The statechart is the deafultResponder. It will delegate actions throughout the hierarchy of active states
    // until a states responds to the action
    SC.RootResponder.responder.set('defaultResponder', Footprint.statechart);

    //
    Footprint.STATIC = sc_static('images/loading.png').replace('images/loading.png','%@');
    // Skipping the login page for now to save time
    setUserContent();

    // Open communication to the socketIO server
    Footprint.socketIO.initSocketIO();

    Footprint.statechart.gotoState('applicationReadyState');
};
function setUserContent() {
    if ((Footprint.store.dataSource.kindOf && Footprint.store.dataSource.kindOf(Footprint.DataSource)) || Footprint.store.dataSource == 'Footprint.DataSource') {
        // TODO this precooked username and password should be something always created on the server for testing
        var users = Footprint.store.createRecords(Footprint.User, [{id:1, username:'test', api_key:'TEST_API_KEY' + ''}]);
        Footprint.userController.set('content', users);
        Footprint.userController.set('userDefaults', SC.UserDefaults.create({ appDomain: "Footprint", userDomain:users.get('firstObject') }));
    }
}


function main() { Footprint.main(); }
