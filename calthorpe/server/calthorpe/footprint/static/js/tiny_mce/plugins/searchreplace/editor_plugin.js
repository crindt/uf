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

(function(){tinymce.create("tinymce.plugins.SearchReplacePlugin",{init:function(a,c){function b(d){window.focus();a.windowManager.open({file:c+"/searchreplace.htm",width:420+parseInt(a.getLang("searchreplace.delta_width",0)),height:170+parseInt(a.getLang("searchreplace.delta_height",0)),inline:1,auto_focus:0},{mode:d,search_string:a.selection.getContent({format:"text"}),plugin_url:c})}a.addCommand("mceSearch",function(){b("search")});a.addCommand("mceReplace",function(){b("replace")});a.addButton("search",{title:"searchreplace.search_desc",cmd:"mceSearch"});a.addButton("replace",{title:"searchreplace.replace_desc",cmd:"mceReplace"});a.addShortcut("ctrl+f","searchreplace.search_desc","mceSearch")},getInfo:function(){return{longname:"Search/Replace",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/searchreplace",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("searchreplace",tinymce.plugins.SearchReplacePlugin)})();