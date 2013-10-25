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
	tinymce.create('tinymce.plugins.Directionality', {
		init : function(ed, url) {
			var t = this;

			t.editor = ed;

			ed.addCommand('mceDirectionLTR', function() {
				var e = ed.dom.getParent(ed.selection.getNode(), ed.dom.isBlock);

				if (e) {
					if (ed.dom.getAttrib(e, "dir") != "ltr")
						ed.dom.setAttrib(e, "dir", "ltr");
					else
						ed.dom.setAttrib(e, "dir", "");
				}

				ed.nodeChanged();
			});

			ed.addCommand('mceDirectionRTL', function() {
				var e = ed.dom.getParent(ed.selection.getNode(), ed.dom.isBlock);

				if (e) {
					if (ed.dom.getAttrib(e, "dir") != "rtl")
						ed.dom.setAttrib(e, "dir", "rtl");
					else
						ed.dom.setAttrib(e, "dir", "");
				}

				ed.nodeChanged();
			});

			ed.addButton('ltr', {title : 'directionality.ltr_desc', cmd : 'mceDirectionLTR'});
			ed.addButton('rtl', {title : 'directionality.rtl_desc', cmd : 'mceDirectionRTL'});

			ed.onNodeChange.add(t._nodeChange, t);
		},

		getInfo : function() {
			return {
				longname : 'Directionality',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/directionality',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		// Private methods

		_nodeChange : function(ed, cm, n) {
			var dom = ed.dom, dir;

			n = dom.getParent(n, dom.isBlock);
			if (!n) {
				cm.setDisabled('ltr', 1);
				cm.setDisabled('rtl', 1);
				return;
			}

			dir = dom.getAttrib(n, 'dir');
			cm.setActive('ltr', dir == "ltr");
			cm.setDisabled('ltr', 0);
			cm.setActive('rtl', dir == "rtl");
			cm.setDisabled('rtl', 0);
		}
	});

	// Register plugin
	tinymce.PluginManager.add('directionality', tinymce.plugins.Directionality);
})();