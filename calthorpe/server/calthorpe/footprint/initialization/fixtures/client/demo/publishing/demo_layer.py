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

from footprint.initialization.fixture import LayerConfigurationFixture
from footprint.initialization.fixtures.client.mixins.publishing.layer_primary_base import primary_base_template_context_dict
from footprint.initialization.fixtures.client.demo.base.demo_primary_parcel_feature import DemoPrimaryParcelFeature

from footprint.models.config.scenario import BaseScenario, FutureScenario, Scenario
from footprint.models.keys.keys import Keys
from footprint.models.presentation.presentation_configuration import LayerConfiguration

__author__ = 'calthorpe'


class DemoLayerConfigurationFixture(LayerConfigurationFixture):
    def layer_libraries(self, layers=None):
        return self.parent_fixture.layer_libraries(self.layers())

    def layers(self):
        return self.parent_fixture.layers() + [
            # Only used by BaseScenarios
            LayerConfiguration(
                scope=BaseScenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_PRIMARY_PARCEL_SOURCE,
                visible=True,
                visible_attributes=['land_use_definition_id'],
                built_form_set_key='sacog_land_use',
                template_context_dict=primary_base_template_context_dict(DemoPrimaryParcelFeature),
            ),
            LayerConfiguration(
                # Show in both base and future Scenarios!
                scope=FutureScenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_PRIMARY_PARCEL_SOURCE,
                visible=False,
                visible_attributes=['land_use_definition_id'],
                built_form_set_key='sacog_land_use',
                template_context_dict=primary_base_template_context_dict(DemoPrimaryParcelFeature),
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_STREAM_FEATURE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_VERNAL_POOL_FEATURE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),

            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_WETLAND_FEATURE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_CPAD_HOLDINGS_FEATURE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            )
        ]

    def update_or_create_templates(self):
        """
            Delegates to default, which will also create templates for the client's custom layers
        :return:
        """
        self.parent_fixture.update_or_create_templates()
