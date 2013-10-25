# UrbanFootprint-California, Scenario Planning Model
# 
# Copyright (C) 2012-2013 Calthorpe Associates
# 
# This program is free software: you can redistribute it and/or modify it under the terms of the
# GNU General Public License as published by the Free Software Foundation, version 3 of the License.
# 
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
# without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License along with this program.
# If not, see <http://www.gnu.org/licenses/>.
# 
# Contact: Calthorpe Associates (urbanfootprint@calthorpe.com)
# Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
# Phone: (510) 548-6800.      Web: www.calthorpe.com
# 

#
# 

#
# 

import json

__author__ = 'calthorpe'
placetype_example_json = """{

        "pt__town_commercial" : [
            {
                "example_name"        : "Downtown Ashland",
                "example_url"         : "http://www.ashland.or.us/"
            },
            {
                "example_name"        : "Downtown Redwood City",
                "example_url"         : "http://www.redwoodcity.org/"
            }

        ],
        "pt__campus_university" : [
            {
                "example_name"  : "University of California, Berkeley",
                "example_url"   : "http://www.berkeley.edu/index.html"
            },
            {
                "example_name"  : "University of Oregon",
                "example_url"   : "http://uoregon.edu/"
            }

        ],
        "default" : [
            {
                "example_name"  : "Placetype example region 1",
                "example_url"   : "http://www.berkeley.edu/index.html"
            },
            {
                "example_name"  : "Placetype example region 2",
                "example_url"   : "http://uoregon.edu/"
            }

        ]
    }"""
PLACETYPE_EXAMPLES = json.loads(placetype_example_json)


