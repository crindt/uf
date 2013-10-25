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
__author__ = 'calthorpe'

from django.db.models.signals import post_save
from django.db.models import Sum
from footprint.managers.geo_inheritance_manager import GeoInheritanceManager
from footprint.models.built_form.built_form import BuiltForm

class PrimaryComponent(BuiltForm):
    """
        Building represents a template building, such as a Rural Community College
    """
    objects = GeoInheritanceManager()

    class Meta(object):
    # This is not abstract so that django can form a many-to-many relationship with it in built_form_set
        app_label = 'footprint'

    def get_parent_field(self):
        return self.placetypecomponent_set


def on_instance_modify(sender, **kwargs):
    instance = kwargs['instance']
    for parent_object in instance.get_parent_field().all():
        if parent_object.primarycomponentpercent_set.all().aggregate(Sum('percent')) > .95:
            parent_object.aggregate_built_form_attributes()
        else:
            pass

post_save.connect(on_instance_modify, sender=PrimaryComponent)
