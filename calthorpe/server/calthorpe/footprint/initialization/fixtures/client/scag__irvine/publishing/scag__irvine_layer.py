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
from footprint.initialization.fixtures.client.scag__irvine.base.scag_general_plan_parcel_feature import ScagGeneralPlanParcelFeature
from footprint.initialization.fixtures.client.scag__irvine.base.scag_existing_land_use_parcel_feature import ScagExistingLandUseParcelFeature
from footprint.models import Project
from footprint.models.config.scenario import BaseScenario, Scenario
from footprint.models.keys.keys import Keys
from footprint.models.presentation.presentation_configuration import LayerConfiguration
from footprint.models.tag import Tag

__author__ = 'calthorpe'


class ScagIrvineLayerConfigurationFixtures(LayerConfigurationFixture):
    def layer_libraries(self, layers=None):

        return self.parent_fixture.layer_libraries(layers or self.layers())

    def layers(self):

        return self.parent_fixture.layers() + [
            LayerConfiguration(
                scope=BaseScenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_SCAG_EXISTING_LAND_USE_PARCEL_SOURCE,
                visible=False,
                visible_attributes=['land_use_definition_id'],
                #built_form_set_key='scag_land_use',
                template_context_dict=primary_base_template_context_dict(ScagExistingLandUseParcelFeature)
            ),
            LayerConfiguration(
                scope=BaseScenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_GENERAL_PLAN_FEATURE,
                visible=False,
                visible_attributes=['land_use_definition_id'],
                #built_form_set_key='scag_land_use',
                template_context_dict=primary_base_template_context_dict(ScagGeneralPlanParcelFeature)
            ),

            LayerConfiguration(
                scope=BaseScenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_PRIMARY_SPZ_SOURCE,
                visible=True,
                visible_attributes=['spzid'],
                template_context_dict={'attributes': {'spzid': {'unstyled': True}}}
            ),
            # The following are scoped for both Scenario subclasses
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_JURISDICTION_BOUNDARY,
                visible=True,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_SPHERE_OF_INFLUENCE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_FLOODPLAIN,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_TIER1_TAZ,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_TIER2_TAZ,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_TRANSIT_AREAS,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
            LayerConfiguration(
                scope=Scenario.__name__,
                db_entity_key=Keys.DB_ABSTRACT_PARKS_OPEN_SPACE,
                visible=False,
                visible_attributes=['geography_id'],
                template_context_dict={'attributes': {'geography_id': {'unstyled': True}}}
            ),
        ]