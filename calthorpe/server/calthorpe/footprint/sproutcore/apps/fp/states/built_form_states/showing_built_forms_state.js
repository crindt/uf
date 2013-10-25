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

sc_require('states/loading_states');

/***
 * The state that manages the projects pane at the top of the application
 * @type {Class}
 */
Footprint.ShowingBuiltFormsState = Footprint.State.design({

    substatesAreConcurrent: YES,


    showingOrNotShowingState: SC.State.extend({
        initialSubstate: 'notShowingState',

        notShowingState: SC.State.extend({
            doVisualize: function() {
                this.gotoState('showingState')
            }
        }),
        showingState: SC.State.extend({
            doClose: function() {
                this.gotoState('notShowingState');
            },

            _infoPane:null,
            enterState: function(context) {
                this._infoPane = this._infoPane || Footprint.VisualizePane.create();
//                Footprint.mainPage.get('mainPane').remove();
                this._infoPane.append();

            },
            exitState: function(context) {
                this._infoPane.remove();
//                Footprint.mainPage.get('mainPane').append();
            }
        })

    }),


    loadManagementState: SC.State.extend({
        initialSubstate: 'initialLoadState',

        initialLoadState: SC.State.extend({
           enterState: function(context){
               Footprint.statechart.sendEvent('selectedBuiltFormDidChange', SC.Object.create({content : Footprint.builtFormCategoriesTreeController.getPath('selection.firstObject')}))
           }
        }),

        // LoadingState when the Footprint.builtFormActiveController is not ready
        loadingFlatBuiltFormState: Footprint.LoadingState.extend({
            enterState: function(context) {
                this._context = context;
                sc_super();
            },

            recordType:Footprint.FlatBuiltForm,
            didLoadEvent: 'didLoadFlatBuiltForm',
            loadingController: Footprint.flatBuiltFormsController,
            recordArray:function() {
                return Footprint.store.find(
                    SC.Query.create({
                        recordType: this.get('recordType'),
                        location:SC.Query.REMOTE,
                        parameters:{
                            built_form_id: this._context.getPath('content.id')
                        }
                    })
                );
            },
            didLoadFlatBuiltForm:function() {
                // Get out of this state
                this.gotoState('loadedState');
            }
        }),
        loadedState: SC.State,

        selectedBuiltFormDidChange: function(context) {
            this.gotoState('loadingFlatBuiltFormState', context);
        }

    })







});

