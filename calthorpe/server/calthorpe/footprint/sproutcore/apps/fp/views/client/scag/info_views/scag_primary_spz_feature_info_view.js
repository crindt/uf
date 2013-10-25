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

sc_require('views/info_views/editable_string_view');
sc_require('views/info_views/select_info_view');
sc_require('views/info_views/info_pane_buttons_view');
sc_require('views/info_views/save_button_view');
sc_require('views/info_views/feature_edit_view');

Footprint.ScagPrimarySpzFeatureInfoView = Footprint.FeatureEditView.extend({
    classNames: 'footprint-primary-spz-feature-info-view'.w(),
    childViews:'headerTitleView commentsTitleView commentsView commitButtonsView bufferView'.w(),
    recordType: Footprint.ScagPrimarySpzFeature,
    content: null,

    headerTitleView: SC.LabelView.create({
        layout: {left: 0.02, top: 0.02},
        value: 'Editable Fields'
    }),

    commentsTitleView: SC.LabelView.create({
        layout: {left: 0.03, bottom: 0.45, width: 0.9, height:24},
        value: 'Comment'
    }),

    commentsView: Footprint.EditableStringView.extend({
           layout: {left: 0.05, width: 0.9, bottom: 0.13, height: 0.32},
            contentBinding: SC.Binding.oneWay('.parentView.content'),
            comments: Footprint.pluralProperty,
            valueBinding:'.comments'
    }),

    commitButtonsView: Footprint.SaveButtonView.extend({
        layout: {height: 30, width: 100, left: 0.04, bottom: 0.01},
        isEditable: YES,
        contentBinding: SC.Binding.oneWay('.parentView.content')
        }),

    bufferView: SC.SegmentedView.extend({
            layout: {height: 30, width: 100, left: 0.34, bottom: 0.01},
            selectSegmentWhenTriggeringAction: NO,
            itemActionKey: 'action',
            itemTitleKey: 'title',
            itemKeyEquivalentKey: 'keyEquivalent',
            itemValueKey: 'title',
            itemIsEnabledKey: 'isEnabled',

            items: [
                // View and edit the selected item's attributes
                SC.Object.create({ title: 'Undo', keyEquivalent: 'ctrl_u', action: '', isEnabled: NO, type: 'chronicler'}),
                SC.Object.create({ title: 'Redo', keyEquivalent: 'ctrl_r', action: '', isEnabled: NO, type: 'chronicler'})
            ]
        })

});
