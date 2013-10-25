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

#from footprint.models.database.information_schema import InformationSchema, GeometryColumns
from django.db import connections
from footprint.utils.multithreading import execute_sql
from models.database.information_schema import InformationSchema, GeometryColumns
import psycopg2
from lib.functions import merge
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'calthorpe.settings'

options = dict(
    export_table='grid150m_kern_loaded_census2010_placetyped_cr',
    working_schema='sjv_scenarios',
    conn_string='dbname=uf_restore host=10.0.0.133 user=calthorpe password=Calthorpe123',
)


def executeSQL_now(conn_string, sqls, db=None, **kwargs):
    """

    :param conn_string:
    :param sqls:
    :param db:
    :param kwargs:
    :return:
    """

    cursor = connections['default'].cursor()
    resultset = []

    for sql in sqls:
        try:
            cursor.execute(sql)
            result = cursor.fetchall()

            results = []
            for n in result:
                results.append(n)
            resultset.append(results)

        except Exception, E:
            resultset.append(E)

    return resultset


def process_table(options):
    print 'reprojecting table'
    if 'srid' not in options:
        options['srid'] = 4326

    reproject = '''UPDATE {working_schema}.{export_table}
    set wkb_geometry = ST_setSRID(ST_transform(wkb_geometry, {srid}),{srid});'''.format(**options)

    execute_sql(options['conn_string'], reproject)


def test(options, schema=None):
    tables_with_geometry = InformationSchema.objects.tables_with_geometry(schema=schema)

    for information_scheme in tables_with_geometry:
        table_dict = dict(
            table_name = information_scheme.table_name,
            table_schema = information_scheme.table_schema,
            column_name = information_scheme.column_name
        )
        sql = """select ST_CoordDim({column_name}), ST_SRID({column_name}), ST_GeometryType({column_name})
              from {schema_name}.{table_name}""".format(**table_dict)
        ret = executeSQL_now(None, [sql])[0]
        if len(ret)>0:
            coord, srid, geom_type = ret[0]
        else:
            coord, srid, geom_type = (2, 4326, 'GEOMETRY')
        GeometryColumns.objects.get_or_create(
            **merge(dict(
                f_table_name=information_scheme.table_name,
                f_geometry_column=information_scheme.column_name,
                f_table_schema=information_scheme.table_schema),
                dict(defaults=dict(
                    # f_table_catalog=information_scheme.table_catalog,
                    coord_dimension=coord,
                    srid=srid,
                    type=geom_type
                ))))
    if False:
        select_tables = "Truncate geometry_columns cascade; \n"\
                        "select table_name, table_schema from information_schema.columns "\
                        "where udt_name = 'geometry' "\
                        "and table_schema = '{schema}';".format(schema=schema)
        if not schema:
            select_tables = """Truncate geometry_columns cascade;
                            select table_name, table_schema, column_name from information_schema.columns
                            where udt_name = 'geometry';"""

        tables_to_fix = executeSQL_now(options['conn_string'], [select_tables])[0]
        updates = []
        for t in tables_to_fix:
            table_dict = dict(
                schema=t[1],
                table_name=t[0],
                geometry_column=t[2],
            )
            print table_dict
            update = '''
    INSERT INTO geometry_columns(f_table_catalog, f_table_schema, f_table_name, f_geometry_column, coord_dimension, srid, "type")
    SELECT '', '{schema}', '{table_name}', '{geometry_column}', ST_CoordDim({geometry_column}), ST_SRID({geometry_column}),
    ST_GeometryType({geometry_column})
    FROM {schema}.{table_name} LIMIT 1;'''.format(**table_dict)
            updates.append(update)
        executeSQL_now(options['conn_string'], updates)



process_table(options)