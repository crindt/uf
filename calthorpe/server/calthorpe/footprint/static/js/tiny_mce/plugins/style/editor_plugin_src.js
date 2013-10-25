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
	tinymce.create('tinymce.plugins.StylePlugin', {
		init : function(ed, url) {
			// Register commands
			ed.addCommand('mceStyleProps', function() {

				var applyStyleToBlocks = false;
				var blocks = ed.selection.getSelectedBlocks();
				var styles = [];

				if (blocks.length === 1) {
					styles.push(ed.selection.getNode().style.cssText);
				}
				else {
					tinymce.each(blocks, function(block) {
						styles.push(ed.dom.getAttrib(block, 'style'));
					});
					applyStyleToBlocks = true;
				}

				ed.windowManager.open({
					file : url + '/props.htm',
					width : 480 + parseInt(ed.getLang('style.delta_width', 0)),
					height : 340 + parseInt(ed.getLang('style.delta_height', 0)),
					inline : 1
				}, {
					applyStyleToBlocks : applyStyleToBlocks,
					plugin_url : url,
					styles : styles
				});
			});

			ed.addCommand('mceSetElementStyle', function(ui, v) {
				if (e = ed.selection.getNode()) {
					ed.dom.setAttrib(e, 'style', v);
					ed.execCommand('mceRepaint');
				}
			});

			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setDisabled('styleprops', n.nodeName === 'BODY');
			});

			// Register buttons
			ed.addButton('styleprops', {title : 'style.desc', cmd : 'mceStyleProps'});
		},

		getInfo : function() {
			return {
				longname : 'Style',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/style',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('style', tinymce.plugins.StylePlugin);
})();
