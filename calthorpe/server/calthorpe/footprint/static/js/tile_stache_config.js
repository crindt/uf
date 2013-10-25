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

fake_config = {
  "logging":"info",
  "cache":
  {
    "name": "Disk",
    "path": "/tmp/stache",
    "umask": "0000",
    "verbose": true
  },
  "layers":
  {
        "parcels": {
                "provider": {
                    "name": "vector",
                    "driver": "postgis",
                    "clip": false,
                    "parameters": {
			"host":     "localhost",
                        "dbname": "urbanfootprint",
                        "user": "calthorpe",
                        "password": "Calthorpe123",
                        "table": "public.sacog_2035_scs_parcel_canvas",
                        "column":"wkb_geometry"
                    }
                }
            },
      "osm":
    {
        "provider": {"name": "proxy", "provider": "OPENSTREETMAP"},
        "png options": {"palette": "http://tilestache.org/example-palette-openstreetmap-mapnik.act"}
    }
  }
}
