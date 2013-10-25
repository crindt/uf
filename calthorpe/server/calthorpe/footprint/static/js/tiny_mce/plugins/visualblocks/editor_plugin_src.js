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
 * Copyright 2012, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	tinymce.create('tinymce.plugins.VisualBlocks', {
		init : function(ed, url) {
			var cssId;

			// We don't support older browsers like IE6/7 and they don't provide prototypes for DOM objects
			if (!window.NodeList) {
				return;
			}

			ed.addCommand('mceVisualBlocks', function() {
				var dom = ed.dom, linkElm;

				if (!cssId) {
					cssId = dom.uniqueId();
					linkElm = dom.create('link', {
						id: cssId,
						rel : 'stylesheet',
						href : url + '/css/visualblocks.css'
					});

					ed.getDoc().getElementsByTagName('head')[0].appendChild(linkElm);
				} else {
					linkElm = dom.get(cssId);
					linkElm.disabled = !linkElm.disabled;
				}

				ed.controlManager.setActive('visualblocks', !linkElm.disabled);
			});

			ed.addButton('visualblocks', {title : 'visualblocks.desc', cmd : 'mceVisualBlocks'});

			ed.onInit.add(function() {
				if (ed.settings.visualblocks_default_state) {
					ed.execCommand('mceVisualBlocks', false, null, {skip_focus : true});
				}
			});
		},

		getInfo : function() {
			return {
				longname : 'Visual blocks',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/visualblocks',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('visualblocks', tinymce.plugins.VisualBlocks);
})();