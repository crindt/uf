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

from footprint.models.built_form.built_form import BuiltForm
from footprint.models.built_form.infrastructure_attributes import InfrastructureAttributeSet
class Infrastructure(InfrastructureAttributeSet, BuiltForm):
    """
        Infrastructure is the container for streets, parks, detention/utilities
    """

    class Meta(object):
        app_label = 'footprint'

    # Returns the string representation of the model.
    def __unicode__(self):
        return self.name
