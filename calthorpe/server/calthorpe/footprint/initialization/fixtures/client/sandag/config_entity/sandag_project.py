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

from django.db import models
from footprint.initialization.fixture import ProjectFixture
from footprint.initialization.fixtures.client.sandag.base.sandag_2050_rtp_transit_network_feature import Sandag2050RtpTransitNetworkFeature
from footprint.initialization.fixtures.client.sandag.base.sandag_2050_rtp_transit_stop_feature import Sandag2050RtpTransitStopFeature
from footprint.initialization.fixtures.client.sandag.base.sandag_scenario_b_boundary import SandagScenarioBBoundaryFeature
from footprint.initialization.fixtures.client.sandag.base.sandag_scenario_c_boundary import SandagScenarioCBoundaryFeature
from footprint.initialization.utils import resolve_default_fixture
from footprint.lib.functions import merge
from footprint.models import ConfigEntity
from footprint.models.keys.keys import Keys

__author__ = 'calthorpe'


class SandagProjectFixture(ProjectFixture):
    def feature_class_lookup(self):
        """
            Adds mappings of custom Feature classes
        :return:
        """
        default_project = resolve_default_fixture("config_entity", "project", ProjectFixture, config_entity=None)
        feature_class_lookup = default_project.feature_class_lookup()
        return merge(feature_class_lookup, {
            Keys.DB_ABSTRACT_SANDAG_SCENARIO_B_BOUNDARY: SandagScenarioBBoundaryFeature,
            Keys.DB_ABSTRACT_SANDAG_SCENARIO_C_BOUNDARY: SandagScenarioCBoundaryFeature,
            Keys.DB_ABSTRACT_SANDAG_2050_RTP_TRANSIT_NETWORK: Sandag2050RtpTransitNetworkFeature,
            Keys.DB_ABSTRACT_SANDAG_2050_RTP_TRANSIT_STOPS: Sandag2050RtpTransitStopFeature
            })

    def default_db_entity_setups(self):
        """
            Project specific SACOG additional db_entities
        :param default_dict:
        :return:
        """

        default_project_fixture = self.parent_fixture
        defaults = default_project_fixture.default_db_entity_setups()

        def source_id_mapping(mapping):
            mapping.pop('source_id')
            mapping.pop('uf_geometry_id')

        return super(SandagProjectFixture, self).default_db_entity_setups() + [
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_SANDAG_SCENARIO_B_BOUNDARY,
                base_class=SandagScenarioBBoundaryFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_SANDAG_SCENARIO_C_BOUNDARY,
                base_class=SandagScenarioCBoundaryFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_SANDAG_2050_RTP_TRANSIT_NETWORK,
                base_class=Sandag2050RtpTransitNetworkFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_SANDAG_2050_RTP_TRANSIT_STOPS,
                base_class=Sandag2050RtpTransitStopFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
        ]
