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

sc_require('views/section_titlebars/scenario_toolbar_view');
sc_require('binding_extensions');
sc_require('views/sections/section_view');

Footprint.ScenarioSectionView = Footprint.SectionView.extend({
    classNames: "footprint-scenario-section-view".w(),

    toolbarView: Footprint.ScenarioToolbarView.extend({
        layout: { height: 24},
        controller: Footprint.projectsController
    }),

    listView: SC.ScrollView.extend({
        layout: { top: 18 },
        contentView: SC.SourceListView.extend({
            isEnabledBindng: SC.Binding.oneWay('content').bool(),
            rowHeight: 20,
            isEditable: YES,
            actOnSelect: YES,
            canEditContent: YES,
            canDeleteContent: YES,
            canReorderContent: YES,

            contentBinding: SC.Binding.oneWay('Footprint.scenarioCategoriesTreeController.arrangedObjects'),
            contentValueKey: 'name',
            selectionBinding: SC.Binding.from('Footprint.scenarioCategoriesTreeController.selection'),
            exampleView: SC.View.extend(SC.Control, {
                classNames: ['sc-list-item-view', 'footprint-scenario-item'],

                childViews: 'nameView populationView dwellingUnitsView employmentView'.w(),

                // The view that can be edited by double-clicking
                editableChildViewKey: 'nameView',

                nameView: Footprint.EditableModelStringView.extend({
                    isEditable: YES,
                    layout: {left: 0, width: .55},
                    valueBinding: '.parentView*content.name',
                    render: function (context, isFirstTime) {
                        sc_super();
                    }
                }),

                // TODO these will be dynamic based on the Result(s) with type 'analytic_bars'
                // TODO Find the first Result with result_type=='analytic_bars'. Assume the result has the following
                // attribute keys
                populationView: Footprint.AnalyticBarView.extend({
                    layout: {left: .55, width: .15},

                    // TODO Our defective ListItemView doesn't update when the child views need an update. So force it.
                    valueUpdateObserver: function () {
                        if (this.get('value')) {
                            this.setPath('parentView.layerNeedsUpdate', YES);
                        }
                    }.observes('.value'),

                    configEntityBinding: SC.Binding.from('.parentView.content'),
                    queryAttributeKey: 'population',
                    isVisibleBinding: SC.Binding.from(".parentView.content").notContentKind(Footprint.TreeItem)
                }),
                dwellingUnitsView: Footprint.AnalyticBarView.extend({
                    layout: {left: .7, width: .15},

                    // TODO Our defective ListItemView doesn't update when the child views need an update. So force it.
                    valueUpdateObserver: function () {
                        if (this.get('value')) {
                            this.setPath('parentView.parentView.layerNeedsUpdate', YES);
                            this.setPath('parentView.layerNeedsUpdate', YES);
                            this.set('layerNeedsUpdate', YES);
                        }
                    }.observes('.value'),

                    configEntityBinding: SC.Binding.from('.parentView.content'),
                    queryAttributeKey: 'dwelling_units',
                    isVisibleBinding: SC.Binding.from(".parentView.content").notContentKind(Footprint.TreeItem)
                }),
                employmentView: Footprint.AnalyticBarView.extend({
                    layout: {left: .85, width: .15},

                    // TODO Our defective ListItemView doesn't update when the child views need an update. So force it.
                    valueUpdateObserver: function () {
                        if (this.get('value')) {
                            this.setPath('parentView.layerNeedsUpdate', YES);
                            this.set('layerNeedsUpdate', YES);
                        }
                    }.observes('.value'),

                    configEntityBinding: SC.Binding.from('.parentView.content'),
                    queryAttributeKey: 'employment',
                    isVisibleBinding: SC.Binding.from(".parentView.content").notContentKind(Footprint.TreeItem)
                })
            })
        })
    })
});

