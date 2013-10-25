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
import unittest
from nose import with_setup
from footprint.models.database.information_schema import PGNamespace
from footprint.models.application_initialization import initialize_table_definitions, initialize_global_config


__author__ = 'calthorpe'

class TestModels(unittest.TestCase):

    def setup(self):
        pass

    def teardown(self):
        pass

    @with_setup(setup, teardown)
    def test_application_initialization(self):
        initialize_table_definitions()
        global_config = initialize_global_config()
        # Assert that the schema is created
        assert PGNamespace.objects.schema_exists(global_config.schema()), "The global schema %s does not exist" % global_config.schema()

