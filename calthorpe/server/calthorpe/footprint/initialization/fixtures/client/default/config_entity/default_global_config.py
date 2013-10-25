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

from footprint.initialization.fixture import GlobalConfigFixture
from footprint.initialization.fixtures.client.default.default_mixin import DefaultMixin
from footprint.initialization.utils import resolve_fixture
from footprint.lib.functions import map_dict, merge

__author__ = 'calthorpe'


class DefaultGlobalConfigFixture(DefaultMixin, GlobalConfigFixture):

    def feature_class_lookup(self):
        return {}

    def default_remote_db_entity_setups(self):
        googles = dict(
            hybrid="https://mt{S}.google.com/vt/lyrs=y&x={X}&y={Y}&z={Z}",
            satellite="https://khm{S}.google.com/kh/v=101&x={X}&y={Y}&z={Z}",
            labels="https://mts{S}.google.com/vt/lyrs=h@218000000&hl=en&src=app&x={X}&y={Y}&z={Z}",
            transit="https://mts{S}.google.com/vt/lyrs=m@219202286,transit:comp%7Cvm:1&hl=en&src=app&opts=r&x={X}&y={Y}&z={Z}&s=G"
        )
        google_setups = map_dict(
            lambda key, url: dict(
                key='google_%s' % key,
                url=url,
                hosts=["1", "2", "3"]),
            googles)

        cloudmade_setups = [dict(
            key='cloudmade_default',
            url="http://{S}tile.cloudmade.com/9c5e79c1284c4bbb838bc6d860d84921/998/256/{Z}/{X}/{Y}.png",
            hosts=["a.", "b.", "c.", ""])]
        return google_setups + cloudmade_setups

    def default_db_entity_setups(self):
        config_entity = self.config_entity
        remote_setups = self.default_remote_db_entity_setups()
        return map(
            lambda remote_setup: config_entity.create_db_entity(**remote_setup),
            remote_setups)
