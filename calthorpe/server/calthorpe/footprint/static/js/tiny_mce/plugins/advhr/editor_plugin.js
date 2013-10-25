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

(function(){tinymce.create("tinymce.plugins.AdvancedHRPlugin",{init:function(a,b){a.addCommand("mceAdvancedHr",function(){a.windowManager.open({file:b+"/rule.htm",width:250+parseInt(a.getLang("advhr.delta_width",0)),height:160+parseInt(a.getLang("advhr.delta_height",0)),inline:1},{plugin_url:b})});a.addButton("advhr",{title:"advhr.advhr_desc",cmd:"mceAdvancedHr"});a.onNodeChange.add(function(d,c,e){c.setActive("advhr",e.nodeName=="HR")});a.onClick.add(function(c,d){d=d.target;if(d.nodeName==="HR"){c.selection.select(d)}})},getInfo:function(){return{longname:"Advanced HR",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advhr",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("advhr",tinymce.plugins.AdvancedHRPlugin)})();