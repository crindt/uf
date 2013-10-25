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

var EmotionsDialog = {
	addKeyboardNavigation: function(){
		var tableElm, cells, settings;
			
		cells = tinyMCEPopup.dom.select("a.emoticon_link", "emoticon_table");
			
		settings ={
			root: "emoticon_table",
			items: cells
		};
		cells[0].tabindex=0;
		tinyMCEPopup.dom.addClass(cells[0], "mceFocus");
		if (tinymce.isGecko) {
			cells[0].focus();		
		} else {
			setTimeout(function(){
				cells[0].focus();
			}, 100);
		}
		tinyMCEPopup.editor.windowManager.createInstance('tinymce.ui.KeyboardNavigation', settings, tinyMCEPopup.dom);
	}, 
	init : function(ed) {
		tinyMCEPopup.resizeToInnerSize();
		this.addKeyboardNavigation();
	},

	insert : function(file, title) {
		var ed = tinyMCEPopup.editor, dom = ed.dom;

		tinyMCEPopup.execCommand('mceInsertContent', false, dom.createHTML('img', {
			src : tinyMCEPopup.getWindowArg('plugin_url') + '/img/' + file,
			alt : ed.getLang(title),
			title : ed.getLang(title),
			border : 0
		}));

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(EmotionsDialog.init, EmotionsDialog);
