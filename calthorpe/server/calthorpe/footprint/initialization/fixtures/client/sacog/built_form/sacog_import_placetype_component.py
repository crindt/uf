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

__author__ = 'calthorpe'

from csvImporter.fields import CharField, FloatField, IntegerField
from csvImporter.model import CsvModel

__author__ = 'calthorpe'

class ImportPlacetypeComponent(CsvModel):
#    BTID,Building_Type,
# Urban Mixed Use,Urban Residential,Urban Commercial,City Mixed Use,City Residential,City Commercial,
# Town Mixed Use,Town Residential,Town Commercial,Village Mixed Use,Village Residential,Village Commercial,
# Neighborhood Residential,Neighborhood Low,Office Focus,Mixed Office and R&D,Office/Industrial,Industrial Focus,
# Low-Density Employment Park,High Intensity Activity Center,Mid Intensity Activity Center,
# Low Intensity Retail-Centered N'Hood,Retail: Strip Mall/ Big Box,Industrial/Office/Res Mixed High,
# Industrial/Office/Res Mixed Low,Suburban Multifamily,Suburban Mixed Residential,Residential Subdivision,
# Large Lot Residential Area,Rural Residential,Rural Ranchettes,Rural Employment,Campus/ University,
# Institutional,Parks & Open Space,BuildingType Name,Gross_Net_Flag
    category = CharField(prepare=lambda x: x or '')
    btid = IntegerField(prepare=lambda x: x or 0)
    color = CharField(prepare=lambda x: x or '')
    name = CharField(prepare=lambda x: x or '')

    class Meta:
        delimiter = ","
        has_header = True

