/* 
* UrbanFootprint-California, Scenario Planning Model
* 
* Copyright (C) 2012-2013 Calthorpe Associates
* 
* This program is free software: you can redistribute it and/or modify it under the terms of the
* GNU General Public License as published by the Free Software Foundation, version 3 of the License.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License along with this program.
* If not, see <http://www.gnu.org/licenses/>.
* 
* Contact: Calthorpe Associates (urbanfootprint@calthorpe.com)
* Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
* Phone: (510) 548-6800.      Web: www.calthorpe.com
* 
 */

sc_require('resources/polymaps');
sc_require('views/presentation/map/polybrush');
sc_require('views/presentation/map/map_configuration');
sc_require('views/presentation/map/map_controls');
sc_require('views/presentation/map/map_painting');
sc_require('views/presentation/map/map_styling');
sc_require('views/presentation/map/map_tools');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

Footprint.MapSectionView = SC.View.extend(Footprint.MapConfiguration, Footprint.MapControls, Footprint.MapPainting, Footprint.MapStyling, SC.ActionSupport, {

    classNames: 'footprint-map-section-view'.w(),
    childViews: 'mapView searchView rezoomToProjectExtentView'.w(),

    /***
     * The Footprint.ConfigEntity or other mappable instance according to which the map is configured
     */
    content: null,
    contentBinding: SC.Binding.oneWay('Footprint.scenarioActiveController.content'),

    /***
     * All Footprint.Layer instances of the Footprint.ConfigEntity
     */
    layers: null,
    layersBinding: SC.Binding.oneWay('Footprint.layerCategoriesTreeController.sortedNodes'),
    layersStatus: null,
    layersStatusBinding: SC.Binding.oneWay('Footprint.layerCategoriesTreeController.status'),

    /***
     * The Footprint.Layer instance of the content which is active
     */
    activeLayer: null,
    activeLayerBinding: SC.Binding.oneWay('Footprint.layerActiveController.content'),

    /***
     * The Footprint.Layer instance of the content which is active
     */
    activeLayerSelection: null,
    activeLayerSelectionBinding: SC.Binding.oneWay('Footprint.layerSelectionActiveController.content'),

    /***
     * The Footprint.User instance of the logged in user. Map selection layers are user specific, thus the
     * user id is used to form those layer names. In the future when the entire Presentation instance is
     * specific to a user, the user will be extracted from the map Presentation instance.
     */
    user: null,
    userBinding: SC.Binding.single('Footprint.userController.content'),

    /***
     * The polymaps map instance attached to the map div element
     */
    map: null,

    mapCreated: NO,

    /***
     * The current map zoom level
     */
    mapZoom: function () {
        return this.map.zoom();
    },

    /***
     * The current center of the map
     */
    mapCenter: function () {
        return this.map.center();
    },

    /***
     * The height of the map.
     * @returns {number}
     */
    mapHeight: function () {
        return this.mapNode().clientHeight();
    },
    /***
     * The width of the map
     * @returns {number}
     */
    mapWidth: function () {
        return this.mapNode().clientWidth();
    },


    init: function () {
        sc_super();

        var self = this;
        // add hotkeys for map controls
        Mousetrap.bind('s', function () {
            self.fireAction('startSelection');
        }, 'keydown');
        Mousetrap.bind('a', function () {
            self.fireAction('startSelection');
        }, 'keydown');
        Mousetrap.bind('esc', function () {
            self.fireAction('doClearSelection');
        }, 'keydown');

        // We set the mapTools here since they depend on the view for the map and to send actions to the view
        Footprint.mapToolsController.set('content', Footprint.MapTools.create({
            mapView: this
        }));
    },

    searchView: SC.View.extend({
        classNames: 'footprint-map-search-view'.w(),
        layout: {centerX:0, width:200, top: 5, height:40},

        // This example adds a search box to a map, using the
        // Google Places autocomplete feature. People can enter geographical searches.
        // The search box will return a pick list containing
        // a mix of places and predicted search terms.

        didCreateLayer: function() {

            var markers = [];

            // Create the search box and link it to the UI element.
            var input = this.$()[0];
            var searchBox = new google.maps.places.SearchBox(input);

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();

                for (var i = 0, marker; marker = markers[i]; i++) {
                    marker.setMap(null);
                }

                // For each place, get the icon, place name, and location.
                markers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location
                    });

                    markers.push(marker);

                    bounds.extend(place.geometry.location);
                }
            });

            // Bias the SearchBox results towards places that are within the bounds of the
            // current map's viewport.
            // TODO need map integration first
            /*
            google.maps.event.addListener(map, 'bounds_changed', function() {
                var bounds = map.getBounds();
                searchBox.setBounds(bounds);
            });
            */
        }
    }),

    mapView: SC.View.extend({
        classNames: 'footprint-map'.w(),
        layout: {left: 0, top: 0, right: 0, bottom: 0},
        didCreateLayer: function () {
            SC.Timer.schedule({target: this, action: "afterDelay", interval: 1000})
        },
        afterDelay: function () {
            this.parentView.createMap();
        }
    }),


    rezoomToProjectExtentView: SC.ButtonView.extend({
        classNames: 'footprint-map footprint-map-rezoom-to-extent-button'.w(),
        layout: {left: 27, top: 135, height: 20, width: 20},
        icon: sc_static('zoom_to_extent.png'),
        action: 'zoomToProjectExtent'
    }),

    setLayerGroupVisibility: function (layerGroup, visible) {
        layerGroup.raster.visible(visible);
        layerGroup.vector.visible(visible);
        layerGroup.selection_layer.visible(visible);
    },

    /***
     * Call this when the activeLayerSelection bounds has been updated to wait for a server update to complete
     * When the activeLayerSelection instance is READY_CLEAN the activeLayerGroup.selectionLayer is reloaded.
     */
    refreshSelectionLayer: function () {
        if (Footprint.mapController.get('selectionLayerNeedsRefresh')) {
            Footprint.mapController.set('selectionLayerNeedsRefresh', NO);
            this.set('selectionLayerNeedsRefresh', NO); // Remove
            this.get('activeLayerSelection').addObserver('status', this, 'reloadSelectionLayerWhenReady');
            this.reloadSelectionLayerWhenReady();
        }
    }.observes('Footprint.mapController.selectionLayerNeedsRefresh'),

    reloadSelectionLayerWhenReady: function () {
        if (this.getPath('activeLayerSelection.status') === SC.Record.READY_CLEAN) {
            var selectionLayer = this.getPath('activeLayerGroup.selectionLayer')
            if (selectionLayer)
                selectionLayer.reload();
            this.get('activeLayerSelection').removeObserver('status', this, 'reloadSelectionLayerWhenReady');
        }
    },

    resetExtent: function () {
        if (Footprint.mapController.get('mapNeedsRezoomToProject')) {
            var project = Footprint.projectActiveController.get('content');
            this.set('configuredExtent', this._polygonBoundingBox(project.getPath('bounds.coordinates')));
            Footprint.mapController.set('mapNeedsRezoomToProject', NO);
        }
    }.observes('Footprint.mapController.mapNeedsRezoomToProject'),

    refreshLayer: function () {
        if (Footprint.mapController.get('layerNeedsRefresh')) {
            Footprint.mapController.set('layerNeedsRefresh', NO);
            if (this.getPath('activeLayerGroup')) {
                this.getPath('activeLayerGroup.raster').reload();
                this.getPath('activeLayerGroup.vector').reload();
            }
        }
    }.observes('Footprint.mapController.layerNeedsRefresh'),

    // TODO hack function for demo
    toggleLayer: function (target, key) {
        // Find the corresponding layer group
        var layerGroup = Footprint.mapLayerGroups[target.get('db_entity_key')];
        this.setLayerGroupVisibility(layerGroup, target.get('visible'));
    }
});

