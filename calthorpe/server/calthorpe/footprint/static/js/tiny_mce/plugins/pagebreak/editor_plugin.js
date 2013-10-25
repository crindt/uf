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

(function(){tinymce.create("tinymce.plugins.PageBreakPlugin",{init:function(b,d){var f='<img src="'+b.theme.url+'/img/trans.gif" class="mcePageBreak mceItemNoResize" />',a="mcePageBreak",c=b.getParam("pagebreak_separator","<!-- pagebreak -->"),e;e=new RegExp(c.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g,function(g){return"\\"+g}),"g");b.addCommand("mcePageBreak",function(){b.execCommand("mceInsertContent",0,f)});b.addButton("pagebreak",{title:"pagebreak.desc",cmd:a});b.onInit.add(function(){if(b.theme.onResolveName){b.theme.onResolveName.add(function(g,h){if(h.node.nodeName=="IMG"&&b.dom.hasClass(h.node,a)){h.name="pagebreak"}})}});b.onClick.add(function(g,h){h=h.target;if(h.nodeName==="IMG"&&g.dom.hasClass(h,a)){g.selection.select(h)}});b.onNodeChange.add(function(h,g,i){g.setActive("pagebreak",i.nodeName==="IMG"&&h.dom.hasClass(i,a))});b.onBeforeSetContent.add(function(g,h){h.content=h.content.replace(e,f)});b.onPostProcess.add(function(g,h){if(h.get){h.content=h.content.replace(/<img[^>]+>/g,function(i){if(i.indexOf('class="mcePageBreak')!==-1){i=c}return i})}})},getInfo:function(){return{longname:"PageBreak",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/pagebreak",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("pagebreak",tinymce.plugins.PageBreakPlugin)})();