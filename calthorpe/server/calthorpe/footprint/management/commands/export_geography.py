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

#
from optparse import make_option
from django.core.management.base import BaseCommand
from footprint.models import Layer
from footprint.models.database.information_schema import register_geometry_columns
from footprint.publishing.data_export import export_layer, export_scenario


class Command(BaseCommand):

    option_list = BaseCommand.option_list + (
        make_option('-n', '--schema', help='The source database schema key (e.g. bayarea)'),
    )

    def handle(self, *args, **options):
        register_geometry_columns(None, options.get('schema', None))
        export_layer(request=None, layer_id=5, api_key="TEST_API_KEY")

