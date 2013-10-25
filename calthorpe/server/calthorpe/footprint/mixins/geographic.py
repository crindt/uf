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

from footprint.models.geographies.geography import Geography

__author__ = 'calthorpe'

from django.contrib.gis.db import models


class Geographic(models.Model):
    """
    a mixin to add a reference to the Geography class
    """
    geography = models.ForeignKey(Geography, null=True)

    @classmethod
    def geography_type(cls):
        return None

    # todo: we don't need to use the layermapping importer for peer tables, so let's only put this on the base tables
    # Because of the layer importer we need this even though the geometry is in the Geography instance
    wkb_geometry = models.GeometryField()

    class Meta(object):
        abstract = True

