from settings import CALTHORPE_DATA_DUMP_LOCATION

__author__ = 'calthorpe'

from fabric.api import (task, env)
from calthorpe_servers import *
from scag_servers import *
from sandag_servers import *
from sacog_servers import *

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
