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
	tinymce.create('tinymce.plugins.Preview', {
		init : function(ed, url) {
			var t = this, css = tinymce.explode(ed.settings.content_css);

			t.editor = ed;

			// Force absolute CSS urls	
			tinymce.each(css, function(u, k) {
				css[k] = ed.documentBaseURI.toAbsolute(u);
			});

			ed.addCommand('mcePreview', function() {
				ed.windowManager.open({
					file : ed.getParam("plugin_preview_pageurl", url + "/preview.html"),
					width : parseInt(ed.getParam("plugin_preview_width", "550")),
					height : parseInt(ed.getParam("plugin_preview_height", "600")),
					resizable : "yes",
					scrollbars : "yes",
					popup_css : css ? css.join(',') : ed.baseURI.toAbsolute("themes/" + ed.settings.theme + "/skins/" + ed.settings.skin + "/content.css"),
					inline : ed.getParam("plugin_preview_inline", 1)
				}, {
					base : ed.documentBaseURI.getURI()
				});
			});

			ed.addButton('preview', {title : 'preview.preview_desc', cmd : 'mcePreview'});
		},

		getInfo : function() {
			return {
				longname : 'Preview',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/preview',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('preview', tinymce.plugins.Preview);
})();