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


__author__ = 'calthorpe'

class PlacetypeFixtures(object):

    simple_fixture = dict(
        Town_Commercial=dict(
            LandUse= [
                {
                           "category" :"Mixed-Use",
                           "percentage" :.21
                },
                {          "category" :"Residential",
                           "percentage" :0.0
                },
                {          "category" :"Jobs",
                           "percentage":0.34
                },
                {          "category" :"Civic",
                           "percentage":0.02
                },
                {          "category" : "Parks",
                           "percentage" :0.07
                },
                {          "category" :"Streets",
                           "percentage" :0.36
                }
            ],
            Residential= [
                {
                    "category" :"Multi-Family",
                    "percentage" :1.0
                },
                {          "category" :"Townhome",
                           "percentage" :0.0
                },
                {          "category" :"Single-Family Small Lot",
                           "percentage":0.0
                },
                {          "category" :"Single-Family Large Lot",
                           "percentage":0.00
                }
            ],
            Employment= [
                {
                    "category" :"Retail",
                    "percentage" :.09
                },
                {          "category" :"Office",
                           "percentage" :0.91
                },
                {          "category" :"Industrial",
                           "percentage":0.0
                }
            ]
        )
    )