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

sc_require('views/label_select_view');
sc_require('views/section_titlebars/label_select_toolbar_view');

/***
 * Tests the binding and display of data in view Footprint.ProjectTitlebarView.
 */
Footprint.ProjectSectionView = SC.View.extend({
    childViews: 'toolbarView'.w(),
    classNames: "footprint-project-section-view".w(),

    toolbarView: Footprint.LabelSelectToolbarView.extend({
//        layout: { centerX: .001, width:0.9},
        layout: { height: 24},
        anchorLocation: SC.ANCHOR_TOP,
        controlSize: SC.REGULAR_CONTROL_SIZE,
        title: 'Edit',

        classNames: "footprint-toolbar-view".w(),
        contentBinding: SC.Binding.oneWay('Footprint.projectsController.content'),
        selectionBinding: SC.Binding.oneWay('Footprint.projectsController'),
        itemTitleKey: 'name'
    })
});

