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

# coding=utf-8
from footprint.managers.geo_inheritance_manager import GeoInheritanceManager

__author__ = 'calthorpe'

from footprint.mixins.name import Name
from django.db import models
from footprint.models.keys.keys import Keys

class BuildingUseDefinition(Name):
    """
        BuildingUseDefinition describes the possible general types of uses for a building
    """
    objects = GeoInheritanceManager()

    category = models.ForeignKey('BuildingUseDefinition', null=True)

    class Meta(object):
        app_label = 'footprint'

    def get_attributes(self):
        return self.averaged_attributes() + self.summed_attributes()

    def averaged_attributes(self):
        return ['efficiency', 'square_feet_per_unit', 'vacancy_rate', 'floor_area_ratio'] + \
            (['household_size'] if self.name in Keys.ALL_RESIDENTIAL_USES else [])

    def summed_attributes(self):
        return ['unit_density', 'net_built_up_area', 'gross_built_up_area']

    def clean(self):
        use_category_dict = Keys.BUILDING_USE_DEFINITION_CATEGORIES
        category = BuildingUseDefinition.objects.get(Name=use_category_dict[self.name]) or None
        self.category = category or 'Unknown'
