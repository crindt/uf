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


# coding=utf-8
# UrbanFootprint-California (v1.0), Land Use Scenario Development and Modeling System.
#
# Copyright (C) 2012 Calthorpe Associates
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

from footprint.managers.geo_inheritance_manager import GeoInheritanceManager
from django.contrib.gis.db import models


class StreetAttributeSet(models.Model):
    """
    Attributes of a :models:`footprint.Building`, :models:`footprint.BuildingType`, or :models:`footprint.Placetype`,
    including a reference to its uses through :model:`built_form.building_use_percent.BuildingUsePercent`.
    """
    objects = GeoInheritanceManager()

    class Meta(object):
        abstract = False
        app_label = 'footprint'

    def attributes(self):
        return "building"

    lane_width = models.DecimalField(max_digits=8, decimal_places=4, default=0)
    number_of_lanes = models.DecimalField(max_digits=8, decimal_places=4, default=0)
    block_size = models.DecimalField(max_digits=8, decimal_places=4, default=0)



