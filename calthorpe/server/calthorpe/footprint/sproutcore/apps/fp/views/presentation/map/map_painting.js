/**
 * Created with PyCharm.
 * User: calthorpe
 * Date: 2/19/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
sc_require('views/presentation/map/polybrush');

/***
 * Mixin to map view to apply painting functions
 */
Footprint.MapPainting = {

    /***
     * Activate the given brush by removing the previous brush from the svg and adding the given one
     * @param paintToolName the name of the brush in the tools object
     */
    activatePaintTool: function() {
        if (Footprint.toolController.get('selectorIsEnabled')) {
            // The d3.svg path creator
            var paintTool = Footprint.mapToolsController.get('activePaintTool');
            if (!paintTool)
                return;
            var brush = paintTool.get('brush');
            // Get the dom element of the map
            var mapNode = d3.select(this.get('mapNode'));
            // Remove previously created brushes
            mapNode.selectAll(".paint-tool").remove();
            // Create the brush by inserting a g element into the map-interface svg
            mapNode.select("#map-interface")
                .insert("svg:g")
                .classed('paint-tool', true)
                // Call the brush to initiate selection
                .call(brush);
        }
    }.observes('Footprint.mapToolsController.activePaintTool', 'Footprint.toolController.selectorIsEnabled'),

    activateNavigationTool: function() {
        // If selection is not enabled or no selection tool is selected
        if (!Footprint.toolController.get('selectorIsEnabled') || !Footprint.mapToolsController.get('activePaintTool')) {
            // Get the dom element of the map
            var mapNode = d3.select(this.get('mapNode'));
            // Remove previously created brushes
            mapNode.selectAll(".paint-tool").remove();
        }
    }.observes('Footprint.mapToolsController.activePaintTool', 'Footprint.toolController.selectorIsEnabled'),

    repaint: function(e) {
        var layerGroup = this.get('activeLayerGroup');
        if (!layerGroup) {
            return false;
        }
        // TODO document what this does
        if (layerGroup.get('selection').length > 0) {
            for (var i = 0; i < e.features.length; i++) {
                var f = d3.select(e.features[i].element);
                f.classed("selected", function() {
                    var id = parseInt(this.id.slice(2));
                    return !$.inArray(id, layerGroup.selection) == -1;
                })
            }
        }
    }
}
