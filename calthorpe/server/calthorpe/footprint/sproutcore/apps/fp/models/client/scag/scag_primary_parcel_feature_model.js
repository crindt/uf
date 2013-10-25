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

Footprint.ScagExistingLandUseParcelFeature = Footprint.PrimaryParcelFeature.extend({
    land_use_definition: SC.Record.toOne("Footprint.ClientLandUseDefinition", {
        isMaster: YES
    }),
    geography: SC.Record.toOne("Footprint.Geography", {
        isMaster: YES,
        nested: YES
    }),
    census_block: SC.Record.toOne("Footprint.CensusBlock", {
        isMaster: YES,
        nested: YES
    }),
    scaguid12 : SC.Record.attr(Number),
    city : SC.Record.attr(String),
    county : SC.Record.attr(String),
    apn : SC.Record.attr(String),
    acres : SC.Record.attr(Number),
    land_use : SC.Record.attr(Number),
    land_use_description : SC.Record.attr(String),
    land_use_type : SC.Record.attr(String),
    comments : SC.Record.attr(String)
});

Footprint.ScagExistingLandUseParcelFeature({

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

