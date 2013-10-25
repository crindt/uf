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
#

from django.db import models
from picklefield import PickledObjectField
from footprint.managers.geo_inheritance_manager import GeoInheritanceManager
from footprint.mixins.key import Key
from footprint.mixins.name import Name

__author__ = 'calthorpe'


class BuiltFormExample(Key, Name):
    objects = GeoInheritanceManager()

    url = models.CharField(max_length=200, null=True, blank=True)
    content = PickledObjectField(null=True)

    def __unicode__(self):
        return "{0} {1}, url:{2}, content_type:{3}".format(Key.__unicode__(self),
                                                           Name.__unicode__(self), self.url, self.content_type)

    class Meta(object):
        app_label = 'footprint'
        verbose_name_plural = 'media'
