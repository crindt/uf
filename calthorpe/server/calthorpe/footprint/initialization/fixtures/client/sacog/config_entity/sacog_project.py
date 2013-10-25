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
from footprint.initialization.fixtures.client.sacog.base.sacog_existing_land_use_parcel_feature import SacogExistingLandUseParcelFeature
from footprint.initialization.fixtures.client.sacog.base.sacog_hardwood_feature import SacogHardwoodFeature
from footprint.initialization.fixtures.client.sacog.base.sacog_stream_feature import SacogStreamFeature
from footprint.initialization.fixtures.client.sacog.base.sacog_vernal_pool_feature import SacogVernalPoolFeature
from footprint.initialization.fixtures.client.sacog.base.sacog_wetland_feature import SacogWetlandFeature
from footprint.lib.functions import merge
from footprint.models import ConfigEntity
from footprint.models.keys.keys import Keys

__author__ = 'calthorpe'


class SacogProjectFixture(ProjectFixture):
    def feature_class_lookup(self):
        """
            Adds mappings of custom Feature classes
        :return:
        """
        parent_fixture = self.parent_fixture
        feature_class_lookup = parent_fixture.feature_class_lookup()
        return merge(feature_class_lookup, {
            Keys.DB_ABSTRACT_SACOG_EXISTING_LAND_USE_PARCEL_SOURCE: SacogExistingLandUseParcelFeature,
            Keys.DB_ABSTRACT_VERNAL_POOL_FEATURE: SacogVernalPoolFeature,
            Keys.DB_ABSTRACT_WETLAND_FEATURE: SacogWetlandFeature,
            Keys.DB_ABSTRACT_STREAM_FEATURE: SacogStreamFeature,
            Keys.DB_ABSTRACT_HARDWOOD_FEATURE: SacogHardwoodFeature
        })

    def default_db_entity_setups(self):
        """
            Project specific SACOG additional db_entities
        :param default_dict:
        :return:
        """

        parent_fixture = self.parent_fixture
        defaults = parent_fixture.default_db_entity_setups()

        def primary_parcel_mapping(mapping):
            # Fill foreign key land_use_definition, using the matching values between
            mapping['land_use_definition'] = {'land_use': 'landuse12'}
            # Fill foreign key census_block, using the matching values between
            mapping['census_block'] = {'block': 'census_block'}
            mapping.pop('source_id')
            mapping.pop('uf_geometry_id')

        census_block_subclass = ConfigEntity.get_db_entity_setup(defaults, Keys.DB_ABSTRACT_CENSUS_BLOCK)[
            'feature_class']

        def source_id_mapping(mapping):
            mapping.pop('source_id')
            mapping.pop('uf_geometry_id')

        return super(SacogProjectFixture, self).default_db_entity_setups() + [
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_SACOG_EXISTING_LAND_USE_PARCEL_SOURCE,
                base_class=SacogExistingLandUseParcelFeature,
                fields=dict(
                    census_block=models.ForeignKey(census_block_subclass)
                ),
                import_table=True,
                source_id_column='source_id',
                import_mapping=primary_parcel_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_VERNAL_POOL_FEATURE,
                base_class=SacogVernalPoolFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_WETLAND_FEATURE,
                base_class=SacogWetlandFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_STREAM_FEATURE,
                base_class=SacogStreamFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            ),\
            self.config_entity.create_db_entity_and_subclass(
                key=Keys.DB_ABSTRACT_HARDWOOD_FEATURE,
                base_class=SacogHardwoodFeature,
                import_table=True,
                source_id_column='source_id',
                import_mapping=source_id_mapping
            )
        ]