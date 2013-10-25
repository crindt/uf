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

from time import sleep
import boto.ec2
from fabric.api import task


@task
def change_instance_type(instance_name="SACOG UF", type="t1.micro"):
    """
    Alters the instance type of an Amazon EC2 instance.
    :param type:
    :return:
    """

    # step 0 : connect to the amazon ec2 management console and get the instance by its name tag
    connection = boto.ec2.connect_to_region('us-west-2')
    instances = [reservation.instances[0] for reservation in connection.get_all_instances()
                if reservation.instances[0].tags['Name'] == instance_name]
    if not instances:
        print "There are no instances with that name, check your spelling."
        return
    instance = instances[0]

    if instance.instance_type == type:
        print "Instance {instance} is already {type}".format(instance=instance.tags['Name'], type=type)
        return

    print "Scaling instance {instance} from {current} to {type}".format(instance=instance.tags['Name'], current=instance.instance_type, type=type)
    # step 1 : shut down the instance
    print "Stopping instance."
    instance.stop()
    print "Waiting for instance to stop..."
    while instance.update() == 'stopping':
        sleep(10)
        print "\tstill waiting..."

    # step 2 : change the instance type
    print "Changing instance type to {type}".format(type=type)
    instance.modify_attribute('instanceType', type)

    # step 3 : start the instance
    print "Starting instance."
    instance.update()
    instance.start()
    print "Waiting for instance to start..."
    while instance.update() == 'pending':
        sleep(10)
        print "\tstill waiting..."

    # step 4 : attach the instance's IP to the instance
    IP = [ip for ip in connection.get_all_addresses() if ip.public_ip == instance.tags['IP']][0]
    IP.associate(instance.id)
    print "connecting {IP} to {instance}... waiting for it to associate".format(IP=IP, instance=instance.tags['Name'])
    sleep(30)

    assert instance.instance_type == type, "Unable to change instance type -- please go to the Amazon console to investigate"

