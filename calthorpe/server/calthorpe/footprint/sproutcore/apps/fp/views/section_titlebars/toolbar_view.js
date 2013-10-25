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
sc_require('views/mixins/view_validation');
sc_require('views/mixins/selected_item');
sc_require('views/section_titlebars/title_view');

Footprint.ToolbarView = SC.View.extend(Footprint.SelectedItem, Footprint.ViewValidation, {
    layout: {height: 17},

    childViews: 'titleView'.w(),
    classNames: "footprint-toolbar-view".w(),
    requiredProperties: 'controller.selection.firstObject.name'.w(),

    /**
     * Controller that has the name and status
     */
    controller: null,
    validationControllerBinding: SC.Binding.oneWay('.controller'),

    title: null,
    /**
     * An observable object keyed by view name and valued by the title to display for each configured view.
     * The given value of the labelView will be formatted to specify the controller.name property
     */
    titles: null,

    /**
     * The view which actually shows the main title of the whatever section of the app the TitlebarView is describing
     * The title is formed by combining titles.labelView with the controller.name or "Loading controller.name"
     * if the latter isn't READY
     */
    titleView: Footprint.TitleView.extend({
        titleBinding: SC.Binding.oneWay('.parentView.title'),
        contentBinding: SC.Binding.oneWay('.parentView.content')
    })
});

