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

from django.db import models
from django.db.models.aggregates import Sum

from footprint.managers.geo_inheritance_manager import GeoInheritanceManager
from footprint.mixins.building_aggregate import BuildingAttributeAggregate
from footprint.mixins.street_attributes import StreetAttributes

from footprint.models.built_form.placetype_component import PlacetypeComponent
from footprint.models.built_form.built_form import BuiltForm

__author__ = 'calthorpe'


# noinspection PySingleQuotedDocstring
class Placetype(BuildingAttributeAggregate, BuiltForm, StreetAttributes):
    """
    Placetypes are a set of BuildingTypes with a percent mix applied to each BuildingType
    """
    objects = GeoInheritanceManager()

    # So the model is pluralized correctly in the admin.
    class Meta(BuiltForm.Meta):
        verbose_name_plural = "Place Types"
        app_label = 'footprint'

    placetype_components = models.ManyToManyField(PlacetypeComponent, through='PlacetypeComponentPercent')

    intersection_density = models.DecimalField(max_digits=8, decimal_places=4, default=0)

    def get_component_field(self):
        return self.placetype_components

    def calculate_gross_net_ratio(self):
        all_components = self.get_all_components()
        net_components = all_components.filter(placetype_component__component_category__contributes_to_net=True)
        gross = all_components.aggregate(Sum('percent'))['percent__sum']
        net = net_components.aggregate(Sum('percent'))['percent__sum']
        return net / gross
