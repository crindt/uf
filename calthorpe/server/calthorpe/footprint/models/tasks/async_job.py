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

import json
import datetime
import os
from django.contrib.auth.models import User
from django.utils import timezone
from fabric.decorators import task
from settings import SENDFILE_ROOT, DOWNLOAD_FILE_EXPIRY

__author__ = 'calthorpe'

from django.db import models
import uuid

class Job(models.Model):
    hashid = models.CharField(max_length=36, unique=True)
    task_id = models.CharField(max_length=36)
    user = models.ForeignKey(User, related_name='jobs')
    type = models.CharField(max_length=32)
    status = models.TextField(blank=True)  # JSON
    created_on = models.DateTimeField(auto_now_add=True)
    ended_on = models.DateTimeField(null=True)
    data = models.CharField(max_length=10000, null=True)

    def __unicode__(self):
        return u'Job %s' % self.hashid

    def save(self, *args, **kwargs):
        if not self.hashid:
            self.hashid = uuid.uuid4()
        super(Job, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_on']
        app_label = 'footprint'

