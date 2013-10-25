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

#
from django.core.management import call_command
from django.template.defaultfilters import slugify

from footprint.initialization.fixture import BuiltFormFixture, LandUseSymbologyFixture
from footprint.initialization.fixtures.client.demo.built_form.demo_land_use_definition import DemoLandUseDefinition
from footprint.initialization.fixtures.client.demo.built_form.demo_land_use import DemoLandUse
from footprint.initialization.utils import resolve_fixture
from footprint.lib.functions import merge
from footprint.models import PlacetypeComponent, PrimaryComponent, Placetype
from footprint.models.built_form.built_form import update_or_create_built_form_medium
from local_settings import CLIENT


class DemoBuiltFormFixture(BuiltFormFixture):
    def built_forms(self):
        def construct_demo_land_uses():
            if DemoLandUseDefinition.objects.count() == 0:
                call_command('loaddata',
                             'footprint/initialization/fixtures/client/demo/built_form/demo_land_use_definitions.json')

            land_use_symbology = resolve_fixture("publishing", "land_use_symbology", LandUseSymbologyFixture)
            land_use_lookup = land_use_symbology.land_use_color_lookup()
            return map(
                lambda land_use_definition: DemoLandUse.objects.update_or_create(
                    key='sac_lu__' + slugify(land_use_definition.land_use).replace('-', ','),
                    defaults=dict(
                        name=land_use_definition.land_use,
                        land_use_definition=land_use_definition,
                        medium=update_or_create_built_form_medium(
                            'demo_land_use_%s' % land_use_definition.land_use[30:],
                            land_use_lookup.get(land_use_definition.land_use, None)
                        )
                    ))[0],
                DemoLandUseDefinition.objects.all())

        return merge(
            self.parent_fixture.built_forms(client=CLIENT),
            self.parent_fixture.built_forms(),
            dict(demo_land_use=construct_demo_land_uses())
        )

    def tag_built_forms(self, built_forms_dict):
        self.parent_fixture.tag_built_forms(built_forms_dict),
        # Give client built_forms a default tag if they don't have any tag yet
        # for built_form in built_forms_dict['sacog_land_use']:
        #     if built_form.tags.count() == 0:
        #         tag, created, updated = Tag.objects.update_or_create(
        #             tag=built_form.land_use_definition.land_use or 'Unsorted')
        #         built_form.tags.add(tag)

    def built_form_sets(self):
        return self.parent_fixture.built_form_sets() + [
            dict(
                key='sacog_buildings',
                name='SACOG Buildings',
                description='Built Forms for SACOG',
                client='demo',
                clazz=PrimaryComponent,
            ),
            dict(
                key='sacog_buildingtypes',
                name='SACOG Buildingtypes',
                description='Built Forms for SACOG',
                client='demo',
                clazz=PlacetypeComponent,
            ),
            dict(
                key='sacog_placetypes',
                name='SACOG Placetypes',
                description='Built Forms for SACOG',
                client='demo',
                clazz=Placetype,
            ),
            # dict(
            #     key='sacog_land_use',
            #     name='SACOG land uses',
            #     description='Land Use definitions from SACOG',
            #     client=None,
            #     clazz=SacogLandUseDefinition
            # )
        ]
