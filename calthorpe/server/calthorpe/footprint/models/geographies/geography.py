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
from django.contrib.gis.db import models

__author__ = 'calthorpe'


class Geography(models.Model):
    """
        Represents a geographic shape such as a parcel, grid cell, line, etc. Other classes having features should
        associate to subclasses of this subclass it.
    """
    objects = models.GeoManager()
    geometry = models.GeometryField()
    source_id = models.TextField(null=False, db_index=True, max_length=200)

    class Meta(object):
        app_label = 'footprint'

