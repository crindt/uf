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

sc_require('views/add_button_view');
sc_require('views/menu_button_view');

Footprint.EditButtonView = Footprint.MenuButtonView.extend({

    classNames: "footprint-edit-button-view".w(),
//    iconBinding: SC.Binding.oneWay('.parentView.icon'),
    // TODO the keyEquivalents will have to be overridden per view section, otherwise each could apply to several views
    menuItems: function () {
        return this.get('defaultMenuItems');
    }.property('defaultMenuItems').cacheable(),


    defaultMenuItems: [
        // View and edit the selected item's attributes
        { title: 'Get Info', keyEquivalent: 'ctrl_i', action: 'doGetInfo'},
        { title: 'New', keyEquivalent: 'ctrl_a', action: 'doNewRecord'},
        { title: 'Clone', keyEquivalent: 'ctrl_c', action: 'doAddRecord'},
        { title: 'Export', keyEquivalent: 'ctrl_e', action: 'doExportRecord'},
        { isSeparator: YES},
        // Remove the selected item
        { title: 'Remove', keyEquivalent: ['ctrl_delete', 'ctrl_backspace'], action: 'doRemove'},
        { title: 'Apply', keyEquivalent: ['ctrl_r'], action: 'doApply'}
    ],

    itemsBinding: SC.Binding.oneWay('.menuItems')
});
