drop table if exists canvases.oahu_2050_c_canvas cascade;
create table canvases.oahu_2050_c_canvas as select
ST_Transform(wkb_geometry, 900913) as wkb_geometry,
id_grid
from inputs_outputs_oahu.grid150m_oahu;

alter table canvases.oahu_2050_c_canvas
add column placetype_id varchar(5),
add column initial_placetype varchar(5),
add column last_placetype varchar(5);

update canvases.oahu_2050_c_canvas set wkb_geometry = setSRID(wkb_geometry, 900913)  where SRID(wkb_geometry) <> 900913;

alter table canvases.oahu_2050_c_canvas
add constraint oahu_2050_c_canvas_pkey primary key (id_grid);

CREATE INDEX oahu_2050_a_canvas_geom_idx
  ON canvases.oahu_2050_a_canvas
  USING gist
  (wkb_geometry);