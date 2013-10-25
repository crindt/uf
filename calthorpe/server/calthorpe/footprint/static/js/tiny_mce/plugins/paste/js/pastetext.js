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

var PasteTextDialog = {
	init : function() {
		this.resize();
	},

	insert : function() {
		var h = tinyMCEPopup.dom.encode(document.getElementById('content').value), lines;

		// Convert linebreaks into paragraphs
		if (document.getElementById('linebreaks').checked) {
			lines = h.split(/\r?\n/);
			if (lines.length > 1) {
				h = '';
				tinymce.each(lines, function(row) {
					h += '<p>' + row + '</p>';
				});
			}
		}

		tinyMCEPopup.editor.execCommand('mceInsertClipboardContent', false, {content : h});
		tinyMCEPopup.close();
	},

	resize : function() {
		var vp = tinyMCEPopup.dom.getViewPort(window), el;

		el = document.getElementById('content');

		el.style.width  = (vp.w - 20) + 'px';
		el.style.height = (vp.h - 90) + 'px';
	}
};

tinyMCEPopup.onInit.add(PasteTextDialog.init, PasteTextDialog);
