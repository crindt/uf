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

import sys
import psycopg2
from vmt import *

#
#    demographics_table
#    core_forVMT
#    quartermi buffer
#    1mi buffer
#    taz intersect

#print options
import vmt

def run_vmt_preprocesses(scenario_id):

#    options = {'base_year_grid': u'grid150m_sandag_loaded_census2010',
#               'canvas_schema': 'canvases',
#               'ComIndWatrReplcmt': Decimal('0.20'),
#               'Urban_Mixed_no_Off': False,
#               'Water_GPED_Office': 50,
#               'unique_name': 'sandag_2050_scs_v2',
#               'gf': False,
#               'Urban_Res_DetSF_LL': False,
#               'census_block_table': u' census_blocks_sf1_2010_lehd_2010_california_near_imputed',
#               'ComIndWatrNewConst': Decimal('30.00'),
#               'Water_GPED_School': 86,
#               'Urban_No_Use': False,
#               'ref_table_schema': u'inputs_outputs_statewide',
#               'Urban_Emp_Off': False,
#               'Urban_Mixed_w_Off': False,
#               'Water_GPED_Industrial': 100,
#               'Urban_Emp_Ag': False,
#               'ann_ind_gas_peremp': 767.56,
#               'scenario_id': '21',
#               'Urban_Mixed_Ag': False,
#               'scenario_year': 2050,
#               'Urban_Emp_Mixed': False,
#               'developable_acres_grid': u'developable_grid_150m_sandag_series12',
#               'scenario_name': u'scs_v2',
#               'working_schema': u'inputs_outputs_sandag',
#               'Urban_Emp_Ind_Off': False,
#               'ResWatrRetro': Decimal('0.05'),
#               'Water_GPCD_SF': 80,
#               'ComEnrgyReplcmt': Decimal('1.00'),
#               'ResEnrgyNewConst': Decimal('30.00'),
#               'Urban_Emp_Ret_Off': False,
#               'YearsBasetoHoriz': 40,
#               'Water_GPED_Retail': 100,
#               'Urban_Res_DetSF_SL': False,
#               'ComEnrgyRetro': Decimal('0.80'),
#               'ComEnrgyNewConst': Decimal('30.00'),
#               'scenario_region': u'sandag',
#               'conn_string': 'dbname=dev_ufg_2 host=10.0.0.91 user=calthorpe password=calthorpe',
#               'loaded_parcels': u'',
#               'Water_GPCD_MF': 70,
#               'ResWatrNewConst': Decimal('30.00'),
#               'Urban_Emp_Ret': False,
#               'ResEnrgyRetro': Decimal('0.50'),
#               'ann_ind_elec_peremp': 27675.45,
#               'core_output': u'core_sandag_2050_scs_v2',
#               'census_blkgrp_table': u' census_blockgroups_acs_2010_ctpp_2000_california_near_imputed',
#               'Urban_Res_Mf': False,
#               'Urban_Emp_Ind_Ret': False,
#               'placetypes': 'footprint_placetype',
#               'ResEnrgyReplcmt': Decimal('0.60'),
#               'horiz_year_pt_grid': u'sandag_2050_scs_v2_canvas',
#               'parcel_portions': u'',
#               'ComIndWatrRetro': Decimal('0.08'),
#               'Urban_Emp_Ind': False,
#               'ResWatrReplcmt': Decimal('0.60')}
#    try:
##        scenario_id     = 21
##        s               = Scenario.objects.get(id=scenario_id)
##        options         = options
#        InputLoadedGrid     = options['base_year_grid']
#        working_schema      = options['working_schema']
#
#
#    except Exception, E:
#        print "Pass the engine a scenario id"
#        raise


    # Variables for one mile buffer & quarter mile buffer
    InputLoadedGrid = 'grid150m_sandag_loaded_census2010'
    working_schema = 'inputs_outputs_sandag'

    # Variables for taz intersect
    trip_geog_table = 'cstdm2009_taz_vc_schema_sanjoaquin_schema1'
    id_trip_geog= 'taz'

    # Variables for vmt variable buffer
    input_taz_geog = 'taz_sandag_2008_final'
    input_taz_trips_table = 'vmt_trip_lengths_sandag'
    ref_table_schema = 'inputs_outputs_sandag'

    vmt.vmt_one_mi_buffer_preprocess_mltcore.run_buffer()


