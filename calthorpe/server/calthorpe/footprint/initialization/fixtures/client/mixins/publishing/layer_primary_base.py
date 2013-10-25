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

from footprint.initialization.fixture import LandUseSymbologyFixture
from footprint.initialization.publishing.tilestache_style_configuration import create_template_context_dict_for_foreign_key
from footprint.initialization.utils import resolve_fixture
import settings

__author__ = 'calthorpe'


def primary_base_template_context_dict(client_primary_base_feature_class):
    # Resolve the client's specific color lookup for the PrimaryParcelFeature land_use_definition
    client_symbology = resolve_fixture(
        "publishing", "land_use_symbology", LandUseSymbologyFixture, settings.CLIENT)

    if not client_symbology:
        return

    color_lookup = client_symbology.land_use_color_lookup()

    model_field = client_primary_base_feature_class._meta.get_field_by_name('land_use_definition')[0]

    # Create a default TemplateContext dict. This context will style the foreign key attribute of the LandUseDefinition
    return create_template_context_dict_for_foreign_key(
        model_field,
        color_lookup,
        'land_use')
