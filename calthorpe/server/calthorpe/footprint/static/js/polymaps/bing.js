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
 * Load the "AerialWithLabels" metadata. "Aerial" and "Road" also work. For more
 * information about the Imagery Metadata service, see
 * http://msdn.microsoft.com/en-us/library/ff701716.aspx
 * You should register for your own key at https://www.bingmapsportal.com/.
 */
var global_bing;
function Polymaps_Bing(map, loaded) {
    var BING_API_KEY = "ArnVpKfWCCxopWmU9F15ICIbrfFNi0UWtjuzBLMQxWrwinPkPV_rgEmERFsG_Nnu";
    global_bing = this;
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "http://dev.virtualearth.net"
        + "/REST/V1/Imagery/Metadata/AerialWithLabels"
        + $.format("?key={0}", BING_API_KEY)
        + "&jsonp=global_bing.callback");
    document.body.appendChild(script);

    this.callback = function(data) {

        /* Display each resource as an image layer. */
        var resourceSets = data.resourceSets;
        for (var i = 0; i < resourceSets.length; i++) {
            var resources = data.resourceSets[i].resources;
            for (var j = 0; j < resources.length; j++) {
                var resource = resources[j];
                map.add(po.image()
                    .url(template(resource.imageUrl, resource.imageUrlSubdomains)))
                    .tileSize({x: resource.imageWidth, y: resource.imageHeight});
            }
        }

        loaded();
    };

    /** Returns a Bing URL template given a string and a list of subdomains. */
    function template(url, subdomains) {
        var n = subdomains.length,
            salt = ~~(Math.random() * n); // per-session salt

        /** Returns the given coordinate formatted as a 'quadkey'. */
        function quad(column, row, zoom) {
            var key = "";
            for (var i = 1; i <= zoom; i++) {
                key += (((row >> zoom - i) & 1) << 1) | ((column >> zoom - i) & 1);
            }
            return key;
        }

        return function(c) {
            var quadKey = quad(c.column, c.row, c.zoom),
                server = Math.abs(salt + c.column + c.row + c.zoom) % n;
            return url
                .replace("{quadkey}", quadKey)
                .replace("{subdomain}", subdomains[server]);
        };
    }
}
