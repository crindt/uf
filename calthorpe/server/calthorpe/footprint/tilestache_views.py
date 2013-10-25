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

from django.http import HttpResponse
from django.views.generic.simple import direct_to_template
from footprint.models import TileStacheConfig


__author__ = 'calthorpe'

import TileStache


class LayerTypes(object):
    REFERENCE_LAYER = "reference"
    EDIT_LAYER = "editing"

    layer_types = dict(
        CensusBlockgroup=REFERENCE_LAYER,
        CensusBlock=REFERENCE_LAYER,
        CensusTract=REFERENCE_LAYER,

        ScagJurisdictionBoundaryFeature=REFERENCE_LAYER,
        ScagSphereOfInfluenceFeature=REFERENCE_LAYER,
        ScagTier1TazFeature=REFERENCE_LAYER,
        ScagTier2TazFeature=REFERENCE_LAYER,
        ScagParksOpenSpaceFeature=REFERENCE_LAYER,
        ScagTransitAreasFeature=REFERENCE_LAYER,
        ScagHabitatConservationAreasFeature=REFERENCE_LAYER,
        ScagFloodplainFeature=REFERENCE_LAYER,

        SacogStreamFeature=REFERENCE_LAYER,
        SacogWetlandFeature=REFERENCE_LAYER,
        SacogVernalPoolFeature=REFERENCE_LAYER,

        ScagPrimarySPZFeature=EDIT_LAYER,
        ScagGeneralPlanFeature=EDIT_LAYER,

        PrimaryParcelFeature=EDIT_LAYER,
        DevelopableFeature=EDIT_LAYER,

        CoreEndStateFeature=REFERENCE_LAYER,
        CoreGrossIncrementFeature=REFERENCE_LAYER,
        CoreIncrementFeature=REFERENCE_LAYER
    )


def tilestache_tiles(request, layer_name, z, x, y, extension):
    """
    :param request:
    :param layer_name:
    :param z:
    :param x:
    :param y:
    :param extension:
    :return:

    Proxy to tilestache
    {X} - coordinate column.
    {Y} - coordinate row.
    {B} - bounding box.
    {Z} - zoom level.
    {S} - host.
    """

    config = TileStacheConfig.objects.filter(name='default')[0].config
    path_info = "%s/%s/%s/%s.%s" % (layer_name, z, x, y, extension)
    coord, extension = TileStache.splitPathInfo(path_info)[1:]
    mimetype, content = TileStache.getTile(config.layers[layer_name], coord, extension)
    return HttpResponse(content, mimetype=mimetype)


def sample_charts(request):
    """
    Ofurhe's sample charts
    :param request:
    :return:
    """
    return direct_to_template(request, 'footprint/charts.html', {})