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



function createDescription() {
    var description = "Neque porro quisquam est, qui doLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit sagittis eros sagittis suscipit. In orci dolor, rutrum sed faucibus nec, rhoncus id nibh. Vivamus tristique mattis venenatis. Curabitur in eros odio. Aenean vel nibh iaculis, faucibus justo at, suscipit turpis. Sed lacinia urna non risus tempus blandit.";


    d3.select('.descriptionBlock')
        .text(description);
}
