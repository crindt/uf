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

from contextlib import contextmanager
import os

def build_postgres_conn_string(db_settings, omit_db=False):
    '''
    Builds a postgres connection string based on the settings
    of a particular database (e.g settings.DATABASES['default'])
    '''

    # We may want to ommit port & host depending on how pg_hba.conf has been configured
    # (TCP sockets vs unix sockets). Specifying the port/host triggers a different authentication mechanism

    pg_conn_string = ''

    if len(db_settings['PORT']) > 0:
        pg_conn_string += '-p {port} '.format(port=db_settings['PORT'])

    if len(db_settings['HOST']) > 0:
        pg_conn_string += '-h {host} '.format(host=db_settings['HOST'])

    if len(db_settings['USER']) > 0:
        pg_conn_string += '-U {user} '.format(user=db_settings['USER'])

    if not omit_db:
        pg_conn_string += '{dbname}'.format(dbname=db_settings['NAME'])

    return pg_conn_string


@contextmanager
def postgres_env_password_loaded(db_settings):
    '''
    Sets postgres environment password to environment variable
    upon entry and unsets it on exit if it did not exist
    '''
    var_existed = False

    if 'PGPASSWORD' in os.environ:
        old_val = os.environ['PGPASSWORD']
        var_existed = True

    os.environ["PGPASSWORD"] = db_settings['PASSWORD']

    try:
        yield
    finally:
        if var_existed:
            os.environ['PGPASSWORD'] = old_val
        else:
            del os.environ['PGPASSWORD']
