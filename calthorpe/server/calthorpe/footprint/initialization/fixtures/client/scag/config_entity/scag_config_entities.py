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

from footprint.initialization.fixture import ConfigEntitiesFixture, MediumFixture
from footprint.initialization.fixtures.client.default.config_entity.default_config_entities import ConfigEntityMediumKey
from settings import CLIENT

__author__ = 'calthorpe'
from django.contrib.gis.geos import MultiPolygon, Polygon


class ScagConfigEntitiesFixture(ConfigEntitiesFixture):
    def project_key(self):
        return None

    def region_key(self):
        return 'scag'

    def regions(self):
        return [
            {
                'key': 'scag',
                'name': 'SCAG',
                'description': 'The SCAG region',
                'media': [
                    MediumFixture(key=ConfigEntityMediumKey.Fab.ricate('scag_logo'), name='SCAG Logo',
                                    url='/static/client/{0}/logos/scag.png'.format(CLIENT))
              ],
                #defaulting to an Irvine view for the moment
                'bounds': MultiPolygon([Polygon((
                    (-117.869537353516, 33.5993881225586),
                    (-117.869537353516, 33.7736549377441),
                    (-117.678024291992, 33.7736549377441),
                    (-117.678024291992, 33.5993881225586),
                    (-117.869537353516, 33.5993881225586),
                ))])

            },
        ]

    def projects(self, region=None):
        return [
            {
                'key': 'irvine',
                'name': 'Irvine',
                'description': "City of Irvine",
                'base_year': 2012,
                'region_index': 0,
                'media': [
                    MediumFixture(key=ConfigEntityMediumKey.Fab.ricate('irvine_logo'), name='Irvine Logo',
                                  url='/static/client/{0}/logos/cityofirvine.png'.format(CLIENT))
                ],
                'bounds': MultiPolygon([Polygon((
                    (-117.869537353516, 33.5993881225586),
                    (-117.869537353516, 33.7736549377441),
                    (-117.678024291992, 33.7736549377441),
                    (-117.678024291992, 33.5993881225586),
                    (-117.869537353516, 33.5993881225586),
                ))])
            },
            {
                 'key': 'orange_county',
                 'name': 'Orange County',
                 'description': "City of Irvine",
                 'base_year': 2012,
                 'region_index': 0,
                 'media': [],
                 'bounds': MultiPolygon([Polygon((
                     (-117.869537353516, 33.5993881225586),
                     (-117.869537353516, 33.7736549377441),
                     (-117.678024291992, 33.7736549377441),
                     (-117.678024291992, 33.5993881225586),
                     (-117.869537353516, 33.5993881225586),
                 ))])
            }
        ]

    def scenarios(self, project=None, class_scope=None):
        return self.matching_scope([], project_key=project.key if project else None, class_scope=class_scope)


