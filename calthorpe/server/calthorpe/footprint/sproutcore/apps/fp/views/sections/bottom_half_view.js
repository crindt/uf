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

sc_require('views/sections/map_section_view');
sc_require('views/sections/sidebar_view');
sc_require('views/sections/policy_section_view');

Footprint.BottomHalfView = SC.View.extend({
    childViews:'sidebarView mapView policiesView'.w(),
    classNames: "footprint-bottom-half-view".w(),

    //---------------------
    // sidebar

    sidebarView: Footprint.SidebarView.extend({
        layout: { left:0, width:0.2, top: 0, bottom: 0 }
    }),

    //---------------------
    // map

    mapView: Footprint.MapSectionView.extend({
        layout: { left:0.2, right:0, top:0, bottom: 0 },
        visible:NO
    }),

    //---------------------
    // Policy Set

    policiesView: Footprint.PolicySectionView.extend({
        layout: { left:.999, right:0, top:0, bottom: 0 },
        visible:NO
    })
});
