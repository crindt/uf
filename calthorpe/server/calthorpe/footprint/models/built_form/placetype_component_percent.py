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
#
# Contact: Joe DiStefano (joed@calthorpe.com), Calthorpe Associates.
# Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
# Phone: (510) 548-6800. Web: www.calthorpe.com
from footprint.managers.geo_inheritance_manager import GeoInheritanceManager
from footprint.mixins.percent import Percent
from footprint.models.built_form.placetype_component import PlacetypeComponent
from django.db import models

__author__ = 'calthorpe'

class PlacetypeComponentPercent(Percent):
    """
        Many-to-many "through" class adds a percent field
    """
    objects = GeoInheritanceManager()
    placetype_component = models.ForeignKey(PlacetypeComponent, null=True)
    placetype = models.ForeignKey('Placetype')

    class Meta(object):
        app_label = 'footprint'

    def component(self):
        return self.placetype_component

    def aggregate(self):
        return self.placetype