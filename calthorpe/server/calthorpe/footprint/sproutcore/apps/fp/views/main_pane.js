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

sc_require('views/sections/top_half_view');
sc_require('views/sections/bottom_half_view');
sc_require('views/sections/project_section_view');
sc_require('views/sections/right_logo_section_view');
sc_require('views/sections/left_logo_section_view');
sc_require('views/user/account_view')

Footprint.MainPane = SC.MainPane.extend({
    childViews: 'projectSectionView leftlogoView rightlogoView accountView splitView'.w(),

    projectSectionView: Footprint.ProjectSectionView.extend({
        layout: { height: 24, left: 0.35, right: 0.35 }
    }),

    leftlogoView: Footprint.LeftLogoSectionView.extend({
        layout: { height: 24, left: 0, width: 0.35 }
    }),

    rightlogoView: Footprint.RightLogoSectionView.extend({
        layout: { height: 24, right:.05, width: 0.35 }
    }),

    accountView: Footprint.AccountView.extend({
        layout: { height: 24, right: 0, width: 0.05 }
    }),

    splitView: SC.SplitView.extend({
        layout: { top: 25 },
        defaultThickness: 0.3,
        layoutDirection: SC.LAYOUT_VERTICAL,
        topLeftView: Footprint.TopHalfView,
        bottomRightView: Footprint.BottomHalfView
    })

});