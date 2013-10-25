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

/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	tinymce.create('tinymce.plugins.IESpell', {
		init : function(ed, url) {
			var t = this, sp;

			if (!tinymce.isIE)
				return;

			t.editor = ed;

			// Register commands
			ed.addCommand('mceIESpell', function() {
				try {
					sp = new ActiveXObject("ieSpell.ieSpellExtension");
					sp.CheckDocumentNode(ed.getDoc().documentElement);
				} catch (e) {
					if (e.number == -2146827859) {
						ed.windowManager.confirm(ed.getLang("iespell.download"), function(s) {
							if (s)
								window.open('http://www.iespell.com/download.php', 'ieSpellDownload', '');
						});
					} else
						ed.windowManager.alert("Error Loading ieSpell: Exception " + e.number);
				}
			});

			// Register buttons
			ed.addButton('iespell', {title : 'iespell.iespell_desc', cmd : 'mceIESpell'});
		},

		getInfo : function() {
			return {
				longname : 'IESpell (IE Only)',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/iespell',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('iespell', tinymce.plugins.IESpell);
})();