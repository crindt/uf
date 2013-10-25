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
from models import Building
from footprint.models.config.global_config import global_config_singleton

__author__ = 'calthorpe'


class TestBuilding(unittest.TestCase):
    def setup(self):
        pass

    def teardown(self):
        pass

    @with_setup(setup, teardown)
    def test_building_uses(self):
        global_config = global_config_singleton()
        built_form_set = global_config.built_form_sets.all()[0]
        buildings = filter(lambda built_form: isinstance(built_form, Building),
                           built_form_set.built_form_definitions.all().select_subclasses("building"))

        buildings_with_building_uses = filter(lambda building: len(building.building_uses.all()) > 0, buildings)
        assert len(buildings_with_building_uses) > 0

