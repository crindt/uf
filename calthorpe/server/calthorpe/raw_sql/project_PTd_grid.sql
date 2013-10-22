drop table if exists canvases.grid150m_oahu_placetyped cascade;
create table canvases.grid150m_oahu_placetyped as select
ST_Transform(wkb_geometry, 900913) as wkb_geometry,
placetype_id,
id_grid

from inputs_outputs_oahu.grid150m_oahu_loaded_placetyped;

create index grid150m_oahu_placetyped_geom on canvases.grid150m_oahu_placetyped using GIST (wkb_geometry);
