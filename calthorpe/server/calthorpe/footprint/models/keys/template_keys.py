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

__author__ = 'calthorpe'

class TemplateKeys(object):

    TEMPLATE_BUILT_FORMS_TILESTACHE = 'template_built_forms_tilestache'
    TEMPLATE_BUILT_FORMS_TILESTACHE_CSS = 'template_built_forms_tilestache_css'
    TEMPLATE_BUILT_FORMS_MAPNIK_CSS = 'template_built_forms_mapnik_css'
    TEMPLATE_BUILT_FORMS_STANDARD_CSS = 'template_built_forms_polymaps_css'

    # Used for features that render increment attributes (e.g. CoreIncrementFeature)
    TEMPLATE_INCREMENTS_TILESTACHE = 'template_increments_tilestache'
    TEMPLATE_INCREMENTS_TILESTACHE_CSS = 'template_increments_tilestache_css'
    TEMPLATE_INCREMENTS_MAPNIK_CSS = 'template_increments_tilestache_css'
    TEMPLATE_INCREMENTS_STANDARD_CSS = 'template_increments_tilestache_css'

    # used for the primary base feature
    TEMPLATE_PRIMARY_BASE_LAND_USE_TILESTACHE = 'template_primary_base_land_use_tilestache'
    TEMPLATE_PRIMARY_BASE_LAND_USE_TILESTACHE_CSS = 'template_primary_base_land_use_tilestache_css'
    TEMPLATE_PRIMARY_BASE_LAND_USE_MAPNIK_CSS = 'template_primary_base_land_use_mapnik_css'
    TEMPLATE_PRIMARY_BASE_LAND_USE_STANDARD_CSS = 'template_primary_base_land_use_polymaps_css'

    TEMPLATE_CENSUS_BLOCK_TILESTACHE = 'template_census_block_tilestache'
    TEMPLATE_CENSUS_BLOCK_TILESTACHE_CSS = 'template_census_block_tilestache_css'
    TEMPLATE_CENSUS_BLOCK_MAPNIK_CSS = 'template_census_block_mapnik_css'
    TEMPLATE_CENSUS_BLOCK_STANDARD_CSS = 'template_census_block_polymaps_css'

    TEMPLATE_CENSUS_BLOCKGROUP_TILESTACHE = 'template_census_blockgroup_tilestache'
    TEMPLATE_CENSUS_BLOCKGROUP_TILESTACHE_CSS = 'template_census_blockgroup_tilestache_css'
    TEMPLATE_CENSUS_BLOCKGROUP_MAPNIK_CSS = 'template_census_blockgroup_mapnik_css'
    TEMPLATE_CENSUS_BLOCKGROUP_STANDARD_CSS = 'template_census_blockgroup_polymaps_css'

    TEMPLATE_FEATURE_SELECTION = 'template_feature_selection'
    TEMPLATE_SELECTION_LAYER_MAPNIK_CSS = 'template_selection_layer_mapnik_css'

