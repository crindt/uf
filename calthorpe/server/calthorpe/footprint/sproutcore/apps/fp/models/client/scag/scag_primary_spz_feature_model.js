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

Footprint.ScagPrimarySpzFeature = Footprint.Feature.extend({
    geography: SC.Record.toOne("Footprint.Geography", {
        isMaster: YES,
        nested: YES
    }),
    comments: SC.Record.attr(String),
    spzid: SC.Record.attr(String),
    population: SC.Record.attr(Number),
    households: SC.Record.attr(Number),
    employees: SC.Record.attr(Number)
});


// Use this name in all subclasses for the api resource name
SC.mixin(Footprint.ScagPrimarySpzFeature, {
    apiClassName: function () {
        return 'scag_primary_spz_feature';
    }
});
