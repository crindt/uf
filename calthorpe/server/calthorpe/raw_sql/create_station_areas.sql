create table inputs_outputs_oahu.oahu_station_area_onemi as select
st_buffer(wkb_geometry, 1609.344) as wkb_geometry
from inputs_outputs_oahu.oahu_proposed_rail_stations;

create table inputs_outputs_oahu.oahu_station_area_halfmi as select
st_buffer(wkb_geometry, 804.672) as wkb_geometry
from inputs_outputs_oahu.oahu_proposed_rail_stations;

create index oahu_station_areas_onemi_geom on inputs_outputs_oahu.oahu_station_area_onemi using GIST (wkb_geometry);

create index oahu_station_areas_halfmi_geom on inputs_outputs_oahu.oahu_station_area_halfmi using GIST (wkb_geometry);

create table inputs_outputs_oahu.oahu_station_area_halfmi_union as select ST_UNION(wkb_geometry) as wkb_geometry from inputs_outputs_oahu.oahu_station_area_halfmi;
create index oahu_station_areas_halfmi_union_geom on inputs_outputs_oahu.oahu_station_area_halfmi_union using GIST (wkb_geometry);

create table inputs_outputs_oahu.oahu_station_area_onemi_union as select ST_UNION(wkb_geometry) as wkb_geometry from inputs_outputs_oahu.oahu_station_area_onemi;
create index oahu_station_areas_onemi_union_geom on inputs_outputs_oahu.oahu_station_area_onemi_union using GIST (wkb_geometry);

create table canvases.oahu_station_area_onemi as 
