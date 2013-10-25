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

Footprint.LoadingPane = SC.MainPane.extend({
    childViews: 'loadingView progressView'.w(),

    loadingView: SC.ImageView.extend({
        classNames:'loading-image'.w(),
        useCanvas:NO,
        layout: {centerX: 0, centerY:0, width:500, height:500},
        value:sc_static('images/loading.png')
    }),
    progressView: SC.ProgressView.extend({
        layout: {centerX:.0001, centerY:0, width:.2, height:16, top:0.3},
        valueBinding:SC.Binding.oneWay('Footprint.loadingStatusController.content'),
        minimum:0,
        maximum:10
    })
});

