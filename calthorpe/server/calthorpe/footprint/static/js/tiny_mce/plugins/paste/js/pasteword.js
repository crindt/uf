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

var PasteWordDialog = {
	init : function() {
		var ed = tinyMCEPopup.editor, el = document.getElementById('iframecontainer'), ifr, doc, css, cssHTML = '';

		// Create iframe
		el.innerHTML = '<iframe id="iframe" src="javascript:\'\';" frameBorder="0" style="border: 1px solid gray"></iframe>';
		ifr = document.getElementById('iframe');
		doc = ifr.contentWindow.document;

		// Force absolute CSS urls
		css = [ed.baseURI.toAbsolute("themes/" + ed.settings.theme + "/skins/" + ed.settings.skin + "/content.css")];
		css = css.concat(tinymce.explode(ed.settings.content_css) || []);
		tinymce.each(css, function(u) {
			cssHTML += '<link href="' + ed.documentBaseURI.toAbsolute('' + u) + '" rel="stylesheet" type="text/css" />';
		});

		// Write content into iframe
		doc.open();
		doc.write('<html><head>' + cssHTML + '</head><body class="mceContentBody" spellcheck="false"></body></html>');
		doc.close();

		doc.designMode = 'on';
		this.resize();

		window.setTimeout(function() {
			ifr.contentWindow.focus();
		}, 10);
	},

	insert : function() {
		var h = document.getElementById('iframe').contentWindow.document.body.innerHTML;

		tinyMCEPopup.editor.execCommand('mceInsertClipboardContent', false, {content : h, wordContent : true});
		tinyMCEPopup.close();
	},

	resize : function() {
		var vp = tinyMCEPopup.dom.getViewPort(window), el;

		el = document.getElementById('iframe');

		if (el) {
			el.style.width  = (vp.w - 20) + 'px';
			el.style.height = (vp.h - 90) + 'px';
		}
	}
};

tinyMCEPopup.onInit.add(PasteWordDialog.init, PasteWordDialog);
