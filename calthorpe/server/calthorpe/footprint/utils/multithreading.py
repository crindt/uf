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

import threading, Queue, psycopg2


##-----------------------------------------------
class Multithread_process(threading.Thread):
    """Threaded Unit of work"""
    def __init__(self, queue, tQueuedJobStr, conn_string):
        threading.Thread.__init__(self)
        self.queue = queue
        self.tQueuedJobStr = tQueuedJobStr
        self.conn_string = conn_string

    def run(self):
        while True:
            #grabs host from queue
            jobD = self.queue.get()
            Task =  self.tQueuedJobStr.format(jobD['start_id'], jobD['end_id'])
            execute_sql(Task, self.conn_string )
            self.queue.task_done()
            return


def queue_process():
    queue = Queue.Queue()
    return queue


def execute_sql(pSQL, conn_string):
    try:
        conn = psycopg2.connect( conn_string )
    except Exception, E:
        print str(E)
    curs = conn.cursor()

    try:
        curs.execute( pSQL )
    except Exception, E:
        print str(E)
    conn.commit()
    conn.close


#----------------------------------------------------------------------------------------
def report_sql_values(pSQL, conn_string, fetch_type):
    try:
        conn = psycopg2.connect( conn_string )
        curs = conn.cursor()
    except Exception, E:
        print str(E)

    try:
        curs.execute( pSQL )
    except Exception, E:
        print str(E)

    Sql_Values = getattr(curs, fetch_type)()
    conn.close
    return Sql_Values