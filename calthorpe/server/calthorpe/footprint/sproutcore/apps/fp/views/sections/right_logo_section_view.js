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
 * Tests the binding and display of data in view Footprint.ProjectTitlebarView.
 */

Footprint.RightLogoSectionView = SC.View.extend({
    childViews: 'titleView rightlogopaneView1'.w(),
    classNames: "footprint-right-logo-section-view".w(),

    titleView: SC.LabelView.create({
        classNames: "footprint-right-logo-title-view",
        name: null,
        nameBinding: SC.Binding.oneWay("Footprint.regionActiveController.name"),
        value: function () {
            if (this.get('name'))
                return "%@ UrbanFootprint Scenario Planning Model".fmt(this.get('name'), this.get('name'))
        }.property('name').cacheable(),
        layout: {left: 0.1, top: .15}
    }),

    rightlogopaneView1: SC.View.extend({
        childViews: 'rightlogoimageView1'.w(),
        layout: {right: 0.02, width: 143},
        rightlogoimageView1: SC.ImageView.extend({
            key: null,
            keyBinding: SC.Binding.oneWay("Footprint.regionActiveController.key"),
            value: function () {
                if (this.get('key')) {
                    var image_path = 'images/client/%@/%@_logo.png'.fmt(this.get('key'), this.get('key'));
                    return Footprint.STATIC.fmt(image_path);
                }
            }.property('key').cacheable()
        })
    })


})
