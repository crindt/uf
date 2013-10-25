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

(function(){tinymce.create("tinymce.plugins.VisualBlocks",{init:function(a,b){var c;if(!window.NodeList){return}a.addCommand("mceVisualBlocks",function(){var e=a.dom,d;if(!c){c=e.uniqueId();d=e.create("link",{id:c,rel:"stylesheet",href:b+"/css/visualblocks.css"});a.getDoc().getElementsByTagName("head")[0].appendChild(d)}else{d=e.get(c);d.disabled=!d.disabled}a.controlManager.setActive("visualblocks",!d.disabled)});a.addButton("visualblocks",{title:"visualblocks.desc",cmd:"mceVisualBlocks"});a.onInit.add(function(){if(a.settings.visualblocks_default_state){a.execCommand("mceVisualBlocks",false,null,{skip_focus:true})}})},getInfo:function(){return{longname:"Visual blocks",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/visualblocks",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("visualblocks",tinymce.plugins.VisualBlocks)})();