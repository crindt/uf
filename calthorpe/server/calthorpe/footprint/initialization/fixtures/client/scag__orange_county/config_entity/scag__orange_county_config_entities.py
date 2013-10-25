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

from footprint.initialization.fixture import ConfigEntitiesFixture
from footprint.models.category import Category
from footprint.models.config.scenario import BaseScenario, FutureScenario


__author__ = 'calthorpe'


class ScagOrangeCountyConfigEntitiesFixture(ConfigEntitiesFixture):


    def scenarios(self, project=None, class_scope=None):

        parent_fixture = self.parent_fixture
        return self.matching_scope(parent_fixture.scenarios(project) + [
            {
                'class_scope': BaseScenario,
                'key': '{0}_base'.format(project.key.split('_')[0]),
                'name': '{0}'.format(project.name),
                'description': 'Base year data review and editing',
                'year': 2012,
                'selections': dict(built_form_sets='scag_land_use'),
                'categories': [Category(key='category', value='base_year')]
            },
            {
                'class_scope': FutureScenario,
                'key': '{0}_scenario_a'.format(project.key),
                'scope': project.schema(),
                'name': 'Scenario A',
                'description': 'Future Scenario for {0}'.format(project.name),
                'year': 2050,
                'selections': dict(),
                'categories': [Category(key='category', value='Future')]
            },
            {
                'class_scope': FutureScenario,
                'key': '{0}_scenario_b'.format(project.key),
                'scope': project.schema(),
                'name': 'Scenario B',
                'description': 'Future Scenario for {0}'.format(project.name),
                'year': 2050,
                'selections': dict(),
                'categories': [Category(key='category', value='Future')]
            }], project_key=project.key if project else None, class_scope=class_scope)


