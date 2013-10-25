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

from settings import CALTHORPE_DATA_DUMP_LOCATION

__author__ = 'calthorpe'

from fabric.api import (task, env)


@task
def localhost(skip_ssh=False):
    """
    Sets up environment to pretend that localhost is a remote server
    """
    if not skip_ssh:
        env.hosts = ['127.0.0.1']

    env.user = env.deploy_user = 'calthorpe'
    env.deploy_user = 'calthorpe'
    env.virtualenv_directory = '/srv/calthorpe_env'
    env.password = 'Calthorpe123'
    env.DATA_DUMP_PATH = CALTHORPE_DATA_DUMP_LOCATION

    env.dev = True
