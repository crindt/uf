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

(function(){tinymce.PluginManager.requireLangPack("example");tinymce.create("tinymce.plugins.ExamplePlugin",{init:function(a,b){a.addCommand("mceExample",function(){a.windowManager.open({file:b+"/dialog.htm",width:320+parseInt(a.getLang("example.delta_width",0)),height:120+parseInt(a.getLang("example.delta_height",0)),inline:1},{plugin_url:b,some_custom_arg:"custom arg"})});a.addButton("example",{title:"example.desc",cmd:"mceExample",image:b+"/img/example.gif"});a.onNodeChange.add(function(d,c,e){c.setActive("example",e.nodeName=="IMG")})},createControl:function(b,a){return null},getInfo:function(){return{longname:"Example plugin",author:"Some author",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example",version:"1.0"}}});tinymce.PluginManager.add("example",tinymce.plugins.ExamplePlugin)})();