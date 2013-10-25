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

from footprint.initialization.fixture import RegionFixture

__author__ = 'calthorpe'


class SacogRegionFixture(RegionFixture):

    def default_remote_db_entity_setups(self):
        return [dict(
            key='sacog_background',
            url="http://services.sacog.org/arcgis/rest/services/Imagery_DigitalGlobe_2012WGS/MapServer/tile/{Z}/{Y}/{X}"
        )]

    def default_db_entity_setups(self):
        """
            Region specific SACOG db_entity_setups
        :param default_dict:
        :return:
        """

        config_entity = self.config_entity
        parent_region_fixture = self.parent_fixture
        default_db_entity_setups = parent_region_fixture.default_db_entity_setups()

        remote_db_entity_setups = map(
            lambda remote_setup: config_entity.create_db_entity(**remote_setup),
            self.default_remote_db_entity_setups())

        return default_db_entity_setups + remote_db_entity_setups

