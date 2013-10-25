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

from django.conf import settings
from django.utils import simplejson

import redis

def send_message_to_client(userid, message_dictionary):
    """
    Sends a message to the web client through websockets
    """
    r = redis.StrictRedis(host=settings.CELERY_REDIS_HOST, port=settings.CELERY_REDIS_PORT, db=settings.CELERY_REDIS_DB)
    channel = 'channel_{0}'.format(userid)
    json_message = simplejson.dumps(message_dictionary)
    r.publish(channel, json_message)


