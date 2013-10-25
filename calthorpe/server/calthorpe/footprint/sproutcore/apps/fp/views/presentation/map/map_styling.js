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

/**
 * Created with PyCharm.
 * User: calthorpe
 * Date: 2/19/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

sc_require('resources/polymaps');
sc_require('resources/d3.v3.js');

/***
 * Mixin for MapView to apply styling to layers
 *
 */
Footprint.MapStyling = {

    stylingLookup:null,

    /***
     * Initializes the styling elements used by the map.
     */
    initStyling: function() {
        var color = d3.scale.linear().domain([1, 15]).range(["red", "green"]);

        this.stylingLookup = SC.Object.create({
            quantize_income: d3.scale.quantize().domain([1,140000])
                .range([1,2,3,4,5,6,7,8,9,10,12,13,14,15]),

            base_stylist: po.stylist()
                .attr('id', function(d) { return "id" + d.properties.geography_id; })
                .attr('class', 'parcel_geometry')
                .title(function(d){ return d.properties.geography_id; })
                .style('fill', function(d) {
                    if (d.properties.hh_avg_inc==0)       { return "white"; }
                    else { return color(this.quantize_income(d.properties.hh_avg_inc)); }
                }),

            built_form_stylist: po.stylist()
                .attr('id', function(d){
                    return "id" + d.properties.geography_id;
                })
                .attr('class', function(d) {
                    return "parcel_geometry  built_form_id-" + d.properties.built_form_id;
                })
                .title(function(d){
                    return d.properties.geography_id;
                }),

            selection_stylist: po.stylist()
                .attr('stroke', 'Yellow').attr('fill','Red;').attr('class', 'selected')
        })
    },

    built_form_css: function(layer) {
        // takes a built_form_feature layer and generates css to style the svg elements
        var built_form_style = layer.medium_context.attributes.built_form_id.equals;
        for (key in built_form_style) {$("built_form_id-" + key).css("fill", built_form_style[key].fill.color)}
    }
};
