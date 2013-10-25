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

(function(a){a.onAddEditor.addToTop(function(c,b){b.settings.inline_styles=false});a.create("tinymce.plugins.LegacyOutput",{init:function(b){b.onInit.add(function(){var c="p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",e=a.explode(b.settings.font_size_style_values),d=b.schema;b.formatter.register({alignleft:{selector:c,attributes:{align:"left"}},aligncenter:{selector:c,attributes:{align:"center"}},alignright:{selector:c,attributes:{align:"right"}},alignfull:{selector:c,attributes:{align:"justify"}},bold:[{inline:"b",remove:"all"},{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}}],italic:[{inline:"i",remove:"all"},{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}}],underline:[{inline:"u",remove:"all"},{inline:"span",styles:{textDecoration:"underline"},exact:true}],strikethrough:[{inline:"strike",remove:"all"},{inline:"span",styles:{textDecoration:"line-through"},exact:true}],fontname:{inline:"font",attributes:{face:"%value"}},fontsize:{inline:"font",attributes:{size:function(f){return a.inArray(e,f.value)+1}}},forecolor:{inline:"font",attributes:{color:"%value"}},hilitecolor:{inline:"font",styles:{backgroundColor:"%value"}}});a.each("b,i,u,strike".split(","),function(f){d.addValidElements(f+"[*]")});if(!d.getElementRule("font")){d.addValidElements("font[face|size|color|style]")}a.each(c.split(","),function(f){var h=d.getElementRule(f),g;if(h){if(!h.attributes.align){h.attributes.align={};h.attributesOrder.push("align")}}});b.onNodeChange.add(function(g,k){var j,f,h,i;f=g.dom.getParent(g.selection.getNode(),"font");if(f){h=f.face;i=f.size}if(j=k.get("fontselect")){j.select(function(l){return l==h})}if(j=k.get("fontsizeselect")){j.select(function(m){var l=a.inArray(e,m.fontSize);return l+1==i})}})})},getInfo:function(){return{longname:"LegacyOutput",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/legacyoutput",version:a.majorVersion+"."+a.minorVersion}}});a.PluginManager.add("legacyoutput",a.plugins.LegacyOutput)})(tinymce);