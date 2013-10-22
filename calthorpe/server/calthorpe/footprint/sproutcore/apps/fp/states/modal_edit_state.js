/*
 * UrbanFootprint-California (v1.0), Land Use Scenario Development and Modeling System.
 *
 * Copyright (C) 2013 Calthorpe Associates
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Contact: Joe DiStefano (joed@calthorpe.com), Calthorpe Associates. Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709. Phone: (510) 548-6800. Web: www.calthorpe.com
 */

sc_require('states/record_crud_states');

// Editing types used for error/log messages
Footprint.RECORD_CLONE = 'clone';
Footprint.RECORD_CREATE = 'create';
Footprint.RECORD_UPDATE = 'update';

/***
 * The state of preparing records for create or update. Implentors of this state
 * should respond to a save action by going to the substate savingRecordState.
 * @type {*}
 */
Footprint.ModalEditState = SC.State.extend({
    // Cache of panes by recordType
    _infoPanes: [],

    _recordType: null,
    _content: null,
    _context: null,
    _nestedStore: null,

    // Set to clone, create, or update for error/log messages
    editType: null,

    /***
     * Called when the main records being saved fail (as opposed to child records).
     */
    saveRecordsDidFail: function(context) {
        SC.AlertPane.warn({
            message: "Failed to %@ records. Report this error if it recurs.".fmt(this.get('editType')),
            description: "Record Types: %@".fmt(uniqueRecordTypes(context.get('nestedStore'), context.get('content')).join(', '))
        });
        // Goto our readyState so that the user can attempt to update again.
        this.gotoState('%@.readyState'.fmt(this.get('name')), context);
    },
    saveBeforeRecordsDidFail: function(context) {
        SC.AlertPane.warn({
            message: "Failed to %@ prerequisite records. Report this error if it recurs.".fmt(this.get('editType')),
            description: "Record Types: %@".fmt(uniqueRecordTypes(context.get('nestedStore'), context.get('content')).join(', '))
        });
        // Goto our readyState so that the user can attempt to update again.
        this.gotoState('%@.readyState'.fmt(this.get('name')), context);
    },
    saveAfterRecordsDidFail: function(context) {
        SC.AlertPane.warn({
            message: "Failed to $@ dependent records. Report this error if it recurs.".fmt(this.get('editType')),
            description: "Record Types: %@".fmt(uniqueRecordTypes(context.get('nestedStore'), context.get('content')).join(', '))
        });
        // Goto our readyState so that the user can attempt to update again.
        this.gotoState('%@.readyState'.fmt(this.get('name')), context);
    },

    /***
     *
     * @param context. Context contains:
     *  recordType: Required. The kind of record to edit
     *  activeRecord: Optional. The record to edit or clone. Set null to create a record from scratch
     *  nowShowing: Optional. Default 'Footprint.FeatureSummaryInfoView'. The view to show of the tabbed
     *  views in the modal window
     *
     */
    enterState:function(context) {
        this._context = context;
        // This will be the record(s) to clone or null for the new case
        var recordType = context.get('recordType');
        if (!recordType) {
            logWarning("No recordType defined in the context. Cannot perform query.");
            Footprint.statechart.gotoState('modalState.readyState');
        }
        this._recordType = recordType;
        this._content = context.get('activeRecord') || nestedStore.createRecord(recordType, {});
        var infoPane = this._infoPanes[recordType.toString()] || Footprint.FeatureInfoView.create({
            recordType:recordType,
            nowShowing:context.get('nowShowing') || 'Footprint.FeatureSummaryInfoView'
        });
        this._infoPanes[recordType.toString()] = infoPane;
        infoPane.append();
        this._infoPane = infoPane;
    },

    initialSubstate:'setupState',
    setupState: SC.State.extend({
        enterState:function() {
            this.gotoState('loadingRecordsState', this.get('parentState')._context);
        }
    }),

    /***
     * A state used to wait for another state to load the records that will be editable records. For instance,
     * when the selection_handler_state updates its selected Features which this modal is editing.
     */
    waitingState:null,

    loadingRecordsState:Footprint.LoadingRecordsState.extend({
        didLoadRecords: function() {
            this.gotoState('%@.readyState'.fmt(this.getPath('parentState.fullPath')), this._context);
        }
    }),

    /***
     * Override this to set up the record(s) for editing, either adding or updating
     */
    readyState:null,

    savingRecordState: Footprint.SavingRecordState,

    exitState:function() {
        this._infoPane.set('content', null);
        this._infoPane.remove();
        if (this._nestedStore && !this._nestedStore.get('isDestroyed'))
            this._nestedStore.destroy();
        Footprint.recordEditController.set('content', null);
    }
});
