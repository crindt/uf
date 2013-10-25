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

sc_require('views/section_titlebars/edit_button_view');
sc_require('views/section_titlebars/title_view');

Footprint.EditTitleView = Footprint.TitleView.extend({
    classNames: "footprint-edit_title-view".w(),
    childViews: 'labelView editView'.w(),
    layout: {left: 0, width: .9},
    recordType: null,
    activeRecord: null,
    menuItems: null,
    controlSize: null,
    content: null,
    icon: null,
    title: null,


    editView: Footprint.EditButtonView.extend({
        layout: {right: 0, width: 26},
        layoutBinding: SC.Binding.oneWay('.parentView.editViewLayout'),
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        recordTypeBinding: SC.Binding.oneWay(parentViewPath(1, '.recordType')),
        activeRecordBinding: SC.Binding.oneWay(parentViewPath(1, '.activeRecord')),
        parentViewMenuItems: null,
        parentViewMenuItemsBinding: SC.Binding.oneWay('.parentView.menuItems'),
        menuItems: function () {
            if (this.getPath('parentViewMenuItems')) {
                return this.get('parentViewMenuItems');
            }
            else {
                return this.get('defaultMenuItems');
            }
        }.property('parentViewMenuItems').cacheable(),

        controlSizeBinding: SC.Binding.oneWay('.parentView.controlSize'),
        // Only show the title if the icon is not set
        title: function() {
            if (!this.get('icon')) {
                return this.getPath('parentView.title');
            }
        }.property('icon'),
        iconBinding: SC.Binding.oneWay('.parentView.icon')
    })
});
