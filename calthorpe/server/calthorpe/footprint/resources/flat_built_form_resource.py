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

from footprint.models import FlatBuiltForm
from footprint.resources.footprint_resource import FootprintResource

__author__ = 'calthorpe'

class FlatBuiltFormResource(FootprintResource):

    class Meta(FootprintResource.Meta):
        always_return_data = True
        queryset = FlatBuiltForm.objects.all()
        resource_name = 'flat_built_form'
        filtering = {
            "built_form_id": ('exact',),
        }
