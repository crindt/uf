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

sc_require('models/footprint_record');
sc_require('models/key_mixin');
sc_require('models/name_mixin');
sc_require('models/tags_mixin');
sc_require('models/medium_models');

Footprint.BuildingAttributeSet = Footprint.Record.extend(
    {
//    building_uses_and_attributes: SC.Record.toMany('Footprint.BuildingUsePercent'),

        parking_spaces: SC.Record.attr(Number),
        parking_structure_square_feet: SC.Record.attr(Number),

        floors: SC.Record.attr(Number),
        total_far: SC.Record.attr(Number),

        // population fields
        gross_population_density: SC.Record.attr(Number),
        household_density: SC.Record.attr(Number),

        // these should really be optional / derived ...
        impervious_roof_percent: SC.Record.attr(Number),
        impervious_hardscape_percent: SC.Record.attr(Number),
        pervious_hardscape_percent: SC.Record.attr(Number),
        softscape_and_landscape_percent: SC.Record.attr(Number),

        irrigated_percent: SC.Record.attr(Number),
        hardscape_percent: SC.Record.attr(Number),
        residential_irrigated_square_feet: SC.Record.attr(Number),
        commercial_irrigated_square_feet: SC.Record.attr(Number),

        residential_average_lot_size: SC.Record.attr(Number),

        gross_net_ratio: SC.Record.attr(Number),

        intersection_density: SC.Record.attr(Number),

        combined_pop_emp_density: SC.Record.attr(Number)
    }
);

Footprint.BuiltForm = Footprint.Record.extend(
    Footprint.Name,
    Footprint.Tags, {
        childRecordNamespace: Footprint,
        medium: SC.Record.toOne("Footprint.Medium", {nested: YES}),
        media: SC.Record.toMany("Footprint.Medium", {nested: YES}),
        building_attributes: SC.Record.toOne("Footprint.BuildingAttributeSet",
            {nested: YES, isMaster: YES}),
        _cloneProperties: function () {
            return 'medium building_attributes'.w();
        },
        _copyProperties: function () {
            return 'tags'.w();
        },

        _mapAttributes: {
            name: function (name) {
                return name + 'New';
            }
        }
    });

Footprint.BuiltFormSet = Footprint.Record.extend(
    Footprint.Key,
    Footprint.Name, {

        childRecordNamespace: Footprint,
        built_forms: SC.Record.toMany("Footprint.BuiltForm", {
            nested: YES,
            inverse: "built_form_set",
            isMaster: YES
        }),

        _copyProperties: function () {
            return 'built_forms'.w();
        },
        _mapAttributes: {
            key: function (key) {
                return key + 'New';
            },
            name: function (name) {
                return name + 'New';
            }
        },

        treeItemIsExpanded: YES,
        treeItemChildren: function () {
            return this.get("built_forms");
        }.property()
    });

Footprint.FlatBuiltForm = Footprint.Record.extend({
    key: SC.Record.attr(Number)

});
