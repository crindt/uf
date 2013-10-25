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

/* 
 *
 */

sc_require('controllers/controllers');
sc_require('controllers/selection_controllers');
sc_require('controllers/global_config_controllers');

/***
 * regionsController organizes the regions as a simple list for region selection and add/remove
 * @type {*}
 */
Footprint.regionsController = Footprint.ArrayController.create(Footprint.ArrayContentSupport, {
    contentBinding:SC.Binding.oneWay('Footprint.globalConfigController.children')
});

/***
 * regionActiveController keeps track of the active Region
 * @type {*}
 */
Footprint.regionActiveController = Footprint.ActiveController.create({
    listController: Footprint.regionsController
});

/***
 * A separate controller from the regionActiveController so that a region can be added or edited without necessarily being the region in context for the rest of the application
 * @type {*}
 */
Footprint.regionEditController = SC.ObjectController.create({
    // Used to create new instances
    recordType: Footprint.Region,
    // The bound object controller, which interacts with its content record directly, rather than via a nested store
    objectControllerBinding:SC.Binding.oneWay('Footprint.regionActiveController')
});
