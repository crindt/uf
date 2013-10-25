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

sc_require('views/menu_render_mixin');

Footprint.MenuButtonView = SC.ButtonView.extend({
    classNames:'footprint-menu-button-view'.w(),
    items:null,
    content:null,
    recordType: null,
    activeRecord:null,

    /***
     * Optional. The item that is selected. Optional
     *   @default null
     */
    value:null,
    /**
     * Optional. The key of the item to display in the menu item view
     *  @type string
    */
    itemTitleKey:'title',

    /**
     * The optional key of the item indicating whether or not it is checked
     *   @type string
    */
    itemCheckboxKey:null,

    /**
     * The created MenuPane
     *  @private
    */
    menu:null,

    /**
     * Creates or reveals the menu
     */
    action: function () {
        var menu = this.get('menu');
        if (!menu) {
            menu = SC.MenuPane.create(Footprint.MenuRenderMixin, {
                anchor: this,
                recordType: this.get('recordType'),
                activeRecord: null,
                activeRecordBinding:SC.Binding.oneWay('.anchor.activeRecord'),
                items: this.get('items'),
                itemTitleKey:this.get('itemTitleKey'),
                itemCheckboxKey:this.get('itemCheckboxKey'),
                itemValueKey:this.get('itemValueKey'),
                observeIsPaneAttached:function() {
                    if (!this.get('isPaneAttached'))
                        this.remove()
                }.observes('.isPaneAttached')
            });
            menu.bind("selectedItem", this, 'value');
            this.set('menu', menu)
        }
        menu.popup(this);
    }
});
