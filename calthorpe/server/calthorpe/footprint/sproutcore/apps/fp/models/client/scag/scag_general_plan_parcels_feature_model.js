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

sc_require('models/feature_model');
sc_require('models/client/client_land_use_definition_model');

Footprint.ScagGeneralPlanParcelFeature = Footprint.Feature.extend({
    geography: SC.Record.toOne("Footprint.Geography", {
        isMaster: YES,
        nested: YES
    }),
    land_use_definition: SC.Record.toOne("Footprint.ClientLandUseDefinition", {
        isMaster: YES,
        nested: YES
    }),
    zone_code: SC.Record.attr(String),
    general_plan_code: SC.Record.attr(String),
    land_use : SC.Record.attr(Number),
    land_use_description : SC.Record.attr(String),
    land_use_type : SC.Record.attr(String),
    apn: SC.Record.attr(String),
    scag_general_plan_code: SC.Record.attr(Number),
    comments: SC.Record.attr(String)
});

Footprint.ScagGeneralPlanParcelFeature.mixin({

    /***
     * A Lookup object that maps a property name to a more friendly representation of the instance, such as
     * built_form: function(built_form) { return built_form.get('name') })
     * @returns {*}
     */
    mapProperties: function () {
        return SC.Object.create(Footprint.Feature.mapProperties(), {
            land_use_definition: function () {
                return 'land_use_definition.land_use_description';
            }.property()
        });
    }
});

Footprint.CensusTract = Footprint.Record.extend({
    tract: SC.Record.attr(Number)
});

Footprint.CensusBlockgroup = Footprint.Record.extend({
    blockgroup: SC.Record.attr(Number),
    census_tract: SC.Record.toOne("Footprint.CensusTract", {
        isMaster: YES,
        nested: YES
    })
});

Footprint.CensusBlock = Footprint.Record.extend({
    block: SC.Record.attr(Number),
    census_blockgroup: SC.Record.toOne("Footprint.CensusBlockgroup", {
        isMaster: YES,
        nested: YES
    })
});

Footprint.Geography = Footprint.Record.extend({
    source_id: SC.Record.attr(Number)
});
