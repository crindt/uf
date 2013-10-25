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

tinyMCEPopup.requireLangPack();

var AnchorDialog = {
	init : function(ed) {
		var action, elm, f = document.forms[0];

		this.editor = ed;
		elm = ed.dom.getParent(ed.selection.getNode(), 'A');
		v = ed.dom.getAttrib(elm, 'name') || ed.dom.getAttrib(elm, 'id');

		if (v) {
			this.action = 'update';
			f.anchorName.value = v;
		}

		f.insert.value = ed.getLang(elm ? 'update' : 'insert');
	},

	update : function() {
		var ed = this.editor, elm, name = document.forms[0].anchorName.value, attribName;

		if (!name || !/^[a-z][a-z0-9\-\_:\.]*$/i.test(name)) {
			tinyMCEPopup.alert('advanced_dlg.anchor_invalid');
			return;
		}

		tinyMCEPopup.restoreSelection();

		if (this.action != 'update')
			ed.selection.collapse(1);

		var aRule = ed.schema.getElementRule('a');
		if (!aRule || aRule.attributes.name) {
			attribName = 'name';
		} else {
			attribName = 'id';
		}

		elm = ed.dom.getParent(ed.selection.getNode(), 'A');
		if (elm) {
			elm.setAttribute(attribName, name);
			elm[attribName] = name;
			ed.undoManager.add();
		} else {
			// create with zero-sized nbsp so that in Webkit where anchor is on last line by itself caret cannot be placed after it
			var attrs =  {'class' : 'mceItemAnchor'};
			attrs[attribName] = name;
			ed.execCommand('mceInsertContent', 0, ed.dom.createHTML('a', attrs, '\uFEFF'));
			ed.nodeChanged();
		}

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(AnchorDialog.init, AnchorDialog);
