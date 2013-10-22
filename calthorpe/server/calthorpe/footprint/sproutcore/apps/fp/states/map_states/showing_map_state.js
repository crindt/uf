
sc_require('states/record_updating_state');
sc_require('states/selection_handler_state');

/***
 * The state that manages the map panel portion of the application
 * @type {Class}
 */
Footprint.ShowingMapState = Footprint.State.design({

    /***
     * Fired when a Layer becomes active
     * @param context
     */
    doViewLayer: function(context) {
        // Disable selector tools
        Footprint.toolController.set('selectorIsEnabled', NO);
        // Re-enter the selectionHandlerState whenever the active layer changes
        // This will make sure our layerSelection/features loading happens
        this.gotoState('selectionHandlerState', context);
        return NO;
    },

    /***
     * Fired when a LayerSelection of the Layer is READY
     * @param context
     */
    doUseLayerSelection: function(context) {
        // Re-enter the selectionHandlerState whenever the active layer changes
        // This will make sure our layerSelection/features loading happens
        this.gotoState('selectionHandlerState', context);
    },

    /***
     * Responds to a PaintTool beginning to draw selection shape on the map.
     * A nested store is created to manage updates the view's activeLayerSelection
     * @param view
     */
    startSelection: function() {
        this.gotoState('selectingBoundsState');
    },

    /***
     * Responds to a PaintTool adding a coordinate to its selection shape.
     * The closed geometry of the new shape is assigned to the activeLayerSelection.bounds
     * Commits the selection continually.
     * @param view
     */
    addToSelection: function() {
        Footprint.statechart.sendAction('doTestSelectionChange', SC.Object.create({
            bounds: Footprint.mapToolsController.get('activePaintTool').geometry()
        }));
    },

    /***
     * Responds to a PaintTool ending its selection shape.
     * The closed geometry of the final shape is assigned to the activeLayerSelection.bounds
     * @param view
     */
    endSelection: function() {
        Footprint.statechart.sendAction('doTestSelectionChange', SC.Object.create({
            selectionWantsToEnd: YES,
            bounds: Footprint.mapToolsController.get('activePaintTool').geometry()
        }));
    },

    doQuerySelection: function(context) {
        this.gotoState('queryingState', context);
    },

    /***
     * Activates the pencil (select individual features) tool
     * @param view
     */
    paintPoint: function(view) {
        // Prevent selection from beginning before the layerSelectionActiveController is ready
        // TODO this should be done instead by disabling the selection buttons
        if (Footprint.layerSelectionActiveController.get('status') & SC.Record.READY) {
            Footprint.mapToolsController.set('activeMapToolKey', 'pointbrush');
        }
    },

    /***
     * Activate the select (draw a shape to select) tool
     * @param view
     */
    paintBox: function(view) {
        // Prevent selection from beginning before the layerSelectionActiveController is ready
        // TODO this should be done instead by disabling the selection buttons
        if (Footprint.layerSelectionActiveController.get('status') & SC.Record.READY) {
            Footprint.mapToolsController.set('activeMapToolKey', 'rectanglebrush');
        }
    },

    /***
     * Activate the select (draw a shape to select) tool
     * @param view
     */
    paintPolygon: function(view) {
        // Prevent selection from beginning before the layerSelectionActiveController is ready
        // TODO this should be done instead by disabling the selection buttons
        if (Footprint.layerSelectionActiveController.get('status') & SC.Record.READY) {
            Footprint.mapToolsController.set('activeMapToolKey', 'polybrush');
        }
    },

    navigate: function(view) {
        Footprint.mapToolsController.set('activeMapToolKey', null);
    },

    /***
     * Undo last paint operation
     * @param view
     */
    doPaintUndo: function(view) {
        if (!Footprint.layerSelectionActiveController.get('featureUndoManager'))
            throw Error("FeatureUndoManager not defined")
        // Calls the undoManager undo which will in turn send an action for the undoState to handle
        Footprint.layerSelectionActiveController.get('featureUndoManager').undo();
    },

    /***
     * Redo last undid operation
     * @param view
     */
    doPaintRedo: function(view) {
        if (!Footprint.layerSelectionActiveController.get('featureUndoManager'))
            throw Error("FeatureUndoManager not defined")
        Footprint.layerSelectionActiveController.get('featureUndoManager').redo()
    },

    /***
     * TODO unimplemented. Revert to the first state in the undo buffer.
     * @param view
     */
    doPaintRevert: function(view) {

    },

    /***
     * Responds to zoomToProjectExtent by calling resetExtent on the mapController
     * @param view
     */
    zoomToProjectExtent: function(view) {
        Footprint.mapController.resetExtent();
    },

    substatesAreConcurrent: YES,

    // The entry to showingMapState. This is probably a good time to tell the mapController that it's ready
    // to show the maps
    enterState: function() {
        Footprint.mapController.set('isReady', YES);
    },

    // All the substates for handling feature selection and updating the selection on the server. This state
    // is always active and ready to accept a new selection drawn or queried by the user (unless the active layerSelection is loading).
    selectionHandlerState: Footprint.SelectionHandlerState
});
