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

from footprint.initialization.fixture import ResultConfigurationFixture
from footprint.initialization.publishing.result_initialization import ResultConfiguration, ResultLibraryKey, ResultKey
from footprint.models.config.scenario import BaseScenario
from footprint.models.keys.keys import Keys


class SandagResultConfigurationFixtures(ResultConfigurationFixture):
    def results(self):
        """
            Used to update or create Results per ConfigEntity instance
            Returns the result library(ies) scoped for the class of self.config_entity.
            The Result will belong to the ResultLibrary specified by result_library_key
        :return:
        """
        return self.matching_scope(
            # Basic Core result query that summarizes increments
            super(SandagResultConfigurationFixtures, self).results() + [

                # Aggregate result from the Analytic Bars
                ResultConfiguration(
                    class_scope=BaseScenario,
                    result_type='analytic_bars',
                    result_library_key=ResultLibraryKey.DEFAULT,
                    result_db_entity_key=ResultKey.Fab.ricate('base_bars'),
                    source_db_entity_key=Keys.DB_ABSTRACT_BASE_FEATURE,

                    name='Base Results',
                    attributes=['employment', 'dwelling_units', 'population'],
                    db_column_lookup=dict(
                        employment='emp',
                        dwelling_units='du',
                        population='pop'
                    ),
                    extent_lookup=dict(
                        population=dict(min=0, max=5000000),
                        dwelling_units=dict(min=0, max=1000000),
                        employment=dict(min=0, max=1000000)
                    ),
                    labels=['Employees', 'Dwelling Units', 'Population'],
                    stackable=False,
                    create_query=self.simple_aggregate
                ),
            ],
            class_scope=self.config_entity.__class__)
