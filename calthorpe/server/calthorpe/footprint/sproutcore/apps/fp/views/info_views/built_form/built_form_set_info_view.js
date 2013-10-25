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
 *
 */

sc_require('views/editable_model_string_view');
sc_require('views/info_views/geography_info_view');
sc_require('views/info_views/tags_info_view');
sc_require('views/info_views/medium_info_view');
sc_require('views/info_views/name_info_view');
sc_require('views/info_views/key_info_view');
sc_require('models/built_form_models');
sc_require('views/info_views/info_view_configuration');
sc_require('views/info_views/content_view');

/***
 * The pane used to edit the settings of a create or existing BuiltFormSet and the DbEntity to which it is associated (if any). The saving order of this will have to first save a created DbEntity and then the BuiltFormSet if a DbEntity is being created here
 * @type {*}
 */
Footprint.BuiltFormSetInfoView = Footprint.InfoPane.extend({
    layout: { top:0, left: 0, width:400, height:400 },
    classNames: "footprint-built-form-set-info-view".w(),

    recordType: Footprint.BuiltFormSet,

    contentView: Footprint.InfoView.extend({
        // TODO look at git history and redo this
    })
});
