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

/*
 *
 */
Footprint.SelectionHandlerState = SC.State.extend({

    initialSubstate:'readyState',
    readyState:SC.State,

    /***
     * Query for features
     * TODO I don't know if this is needed
     * @param view
     */
    doFeatureQuery: function(context) {
        if (Footprint.layerSelectionActiveController.get('status') !== SC.Record.READY_CLEAN)
            return;
        this.statechart.sendAction('doQueryRecords',
            SC.Object.create({
                activeRecord:Footprint.featuresActiveController.get('content'),
                recordType:Footprint.featuresActiveController.get('activeRecordType')
            })
        );
    },

    /***
     * Clears the selection and saves the clear layerSelection to the server
     */
    doClearSelection: function() {
        Footprint.statechart.gotoState('selectingBoundsState', SC.Object.create({
            selectionWantsToEnd: YES,
            bounds: null
        }));
    },

    /***
     * Called by the undoManager. If the recordType of the context matches, this goes to the undoingState
     * @param context
     */
    doRecordUndo: function(context) {
        if (context.get('recordType').subclassOf(Footprint.Feature)) {
            this.gotoState('undoingState', context);
            return YES;
        }
        return NO;
    },

    /***
     * If a record update fails this handles the event.
     * @param context. This could be used to report what records failed
     */
    updateDidFail: function(context) {
        // Simply return to the readyToUpdateState so that the user can try updating again.
        this.gotoState('readyToUpdateState')
    },

    enterState: function(context) {
        // No Feature Footprint.featuresActiveController.get('content'))inspection or updating is allowed until we have downloaded the features
        Footprint.toolController.set('featurerIsEnabled', NO);

        if (!Footprint.layerSelectionActiveController.get('status') & SC.Record.READY)
            Footprint.statechart.gotoState('noSelectionLayerState');
        else
        // Enable selector tools
            Footprint.toolController.set('selectorIsEnabled', YES);

        if (!Footprint.layerSelectionActiveController.getPath('features.length'))
        // If we have no features in the selection goto the noSelectionState
            Footprint.statechart.gotoState('noSelectionState');
        else
        // Features exist. Goto the selectionIsReadyState which listens for selection updates or
        // the selection wanting to end (e.g. user finishes drawing a shape).
            Footprint.statechart.gotoState('selectionIsReadyState');
    },

    noSelectionLayerState:SC.State.extend({
        enterState: function() {
            Footprint.layerSelectionActiveController.addObserver('status', this, 'layerSelectionStatusDidChange');
        },
        layerSelectionStatusDidChange: function() {
            // Go back up a level and see where we are--either with or without features
            Footprint.statechart.gotoState('selectionHandlerState');
        },
        exitState: function() {
            Footprint.layerSelectionActiveController.removeObserver('status', this, 'layerSelectionStatusDidChange');
        }
    }),


    // If there's no selection, we just hang out and wait for the user to start selecting.
    noSelectionState:SC.State.extend({

        enterState: function() {
            Footprint.toolController.set('featurerIsEnabled', NO);
            // Active features correspond to the selection. No selection means no features
            Footprint.featuresActiveController.setPath('content', null);
        },

        // Listed for the doStartSelection action and goto selectingBoundsState
        doStartSelecting: function() {
            this.gotoState('selectingBoundsState');
        }
    }),

    queryingState:Footprint.QueryingState,


    // While the user is selecting, the statechart may update the server any number of times, including
    // while already mid-update. When the "done selecting" (or "cancel selecting") actions get sent, we
    // have to make sure that the final selection change has been saved before exiting the state.
    selectingBoundsState: Footprint.SelectingBoundsState,

    // When a selection is ready, we load the features and then allow the user to edit them (multiple
    // times).
    selectionIsReadyState:SC.State.extend({

        // The user may start a new selection at any time, meaning any of this state's substates
        // must be able to correctly handle being unexpectedly exited.
        doStartSelecting: function() {
            this.gotoState('selectingBoundsState');
        },

        initialSubstate:'loadingFeaturesState',

        enterState: function() {
            // Create the undoManager if it doesn't yet exist
            var featureUndoManager = Footprint.layerSelectionActiveController.get('featureUndoManager');
            if (!featureUndoManager)
                Footprint.layerSelectionActiveController.set(
                    'featureUndoManager',
                    SC.UndoManager.create());

            // Create the array of saving Feature sets
            //this.get('savingFeatureSets');
        },

        loadingFeaturesState:Footprint.LoadingState.extend({

            didLoadEvent:'featuresDidLoad',
            loadingController:Footprint.featuresActiveController,

            enterState: function() {
                // I would check for an empty selection here ... but just out of sheer paranoia. =)
                // Might also be useful if you wanted to bypass the initial selection check made in
                // selectionHandlerState.enterState and instead just always go here first. Lots of
                // valid options.
                if (!Footprint.layerSelectionActiveController.getPath('features.length')) {
                    this.gotoState('noSelectionState');
                    return;
                }
                else {
                    Footprint.statechart.sendEvent('selectedFeaturesWillUpdate');
                }
                sc_super();
            },
            /***
             * Fetches the features in the Footprint.layerSelectionActive controller via a remote query
             * @returns {*}
             */
            recordArray: function() {
                return Footprint.store.find(SC.Query.create({
                    recordType:Footprint.layerSelectionActiveController.getPath('selection_layer.featureRecordType'),
                    location:SC.Query.REMOTE,
                    parameters:{
                        // We use the layer_selection instead of listing all the feature ids, to prevent
                        // overly long URLs
                        layer_selection:Footprint.layerSelectionActiveController.get('content')
                    }
                }));
            },
            featuresDidLoad: function() {
                // Look over all in-flight saves. If any of them include features that overlap with the current set:
                var featureSet = this.getPath('loadingController.content');
                /*
                 var conflictingFeatureSets = this.getPath('parentState.savingFeatureSets').filter(function(savingFeatureSet) {
                 return savingFeatureSet.filter(function(savingFeature) {
                 return featureSet.contains(savingFeature);
                 }).length > 0
                 });
                 */
                //if (conflictingFeatureSets.length > 0)
                //    this.gotoState('notReadyToUpdateState', {conflictingFeatureSets:conflictingFeatureSets});
                //else
                this.gotoState('readyToUpdateState');
                // This tells the modal state (and possibly others) to update their features
                Footprint.statechart.sendEvent('selectedFeaturesDidUpdate',
                    SC.Object.create({
                        activeRecord:Footprint.featuresActiveController.get('content'),
                        recordType:Footprint.featuresActiveController.get('activeRecordType')
                    })
                );
            }
        }),

        notReadyToUpdateFeaturesState:SC.State.extend({
            enterState: function(context) {
                this._conflictingFeatureSets = context.conflictingFeatureSets;
                // Wait until current selection set no longer overlaps with previous in-flight saves.
                this._conflictingFeatureSets.forEach(function(conflictingFeatureSet) {
                    conflictingFeatureSet.addObserver('status', this, 'conflictingFeatureSetStatusDidChange');
                })
            },
            conflictingFeatureSetStatusDidChange: function(sender) {
                if (sender.get('status') & SC.Record.READY) {
                    sender.removeObserver('status', this, 'conflictingFeatureSetStatusDidChange');
                    this._conflictingFeatureSets.remove(sender)
                    if (this._conflictingFeatureSets.length() == 0) {
                        this.gotoState('readyToUpdateState');
                    }
                }
            },
            exitState: function(context) {
                // Remove any obserers that aren't already removed
                this._conflictingFeatureSets.forEach(function(conflictingFeatureSet) {
                    conflictingFeatureSet.removeObserver('status', this, 'conflictingFeatureSetStatusDidChange');
                });
                this._conflictingFeatureSets = null;
            }
        })
    }),

    /***
     * Creates an active painting context for the selected features and the controller settings
     */
    activeFeaturePaintingContext: function() {
        var context = SC.Object.create({
            built_form: Footprint.builtFormActiveController.get('content'),
            dev_pct: Footprint.paintingController.get('developmentPercent'),
            density_pct: Footprint.paintingController.get('densityPercent'),
            total_redev: Footprint.paintingController.get('isFullRedevelopment')
        });
        return this._featureContext(context)
    }.property(),

    /***
     * Creates an clear painting context for the selected features and the controller settings.
     */
    clearFeaturePaintingContext: function() {
        var context = SC.Object.create({
            built_form: null,
            dev_pct: 1,
            density_pct: 1,
            total_redev: NO
        });
        return this._featureContext(context)
    }.property(),

    _featureContext: function(context) {
        return SC.Object.create({
            // The undoManager for features of the active layer selection
            undoManager: Footprint.layerSelectionActiveController.get('featureUndoManager'),
            // The same structure as this object but used to undo the features back to their previous state
            undoContext: this.get('undoFeatureContext'),
            // The Feature recordType
            recordType: Footprint.layerActiveController.get('featureRecordType'),
            // An array of each feature to be updated along with the values to update (context)
            // The resulting object is {feature:feature, attributeToUpdate:value, attributeToUpdate:value, ...}
            recordContexts:Footprint.featuresActiveController.map(function(feature) {
                return SC.Object.create({
                        record:feature
                    },
                    context
                )
            })
        });
    },

    /***
     * Creates a context for freezing a painting context of the current feature set for undo/redo
     */
    undoFeatureContext: function() {
        return SC.Object.create({
            // The undoManager for features of the active layer selection
            undoManager: Footprint.layerSelectionActiveController.get('featureUndoManager'),
            // The Feature recordType
            recordType: Footprint.layerActiveController.get('featureRecordType'),
            // An array of each feature to be undone along with the values to undo to (context)
            // The resulting object is {feature:feature, attributeToUpdate:value, attributeToUpdate:value, ...}
            recordContexts: Footprint.featuresActiveController.map(function(feature) {
                return SC.Object.create(
                    {record:feature},
                    // extract the primitive attributes from the record to be target attribute values for undoing
                    $.mapToDictionary(['built_form', 'dev_pct', 'density_pct', 'total_redev'], function(attr) {
                        return [attr, feature.get(attr)];
                    })
                )
            })
        })
    }.property(),

    readyToUpdateState:SC.State.extend({

        enterState: function() {
            Footprint.toolController.set('featurerIsEnabled', YES);
        },

        /***
         * Handles updating the features via painting
         */
        doPaintApply: function() {
            this.gotoState('updatingState', this.getPath('parentState.activeFeaturePaintingContext'));
        },

        /***
         * Handles clearing the features via painting
         */
        doPaintClear: function() {
            this.gotoState('updatingState', this.getPath('parentState.clearFeaturePaintingContext'));
        },

        /***
         * Identify and/or Edit features
         * @param view
         */
        doFeatureIdentify: function(view) {
            if (Footprint.layerSelectionActiveController.get('status') !== SC.Record.READY_CLEAN)
                return;
            this.statechart.sendAction('doEditRecord',
                SC.Object.create({
                    activeRecord:Footprint.featuresActiveController.get('content'),
                    recordType:Footprint.featuresActiveController.get('activeRecordType')
                })
            );
        }
    }),
    updatingState:Footprint.RecordUpdatingState.extend({
        recordsDidUpdate:function() {
            // Do the default stuff
            sc_super();
            // Clear the selection
            Footprint.statechart.sendAction('doClearSelection');
        }
    }),
    // Undo is the same as update but it doesn't register an undo
    undoingState:Footprint.RecordUpdatingState.extend({
        recordsDidUpdate:function() {
            // Skip sc_super() so we don't register an undo
            // TODO maybe update layerSelection here
            Footprint.statechart.sendAction('doClearSelection');
        }
    })
});
