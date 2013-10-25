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

(function(){tinymce.create("tinymce.plugins.AdvancedImagePlugin",{init:function(a,b){a.addCommand("mceAdvImage",function(){if(a.dom.getAttrib(a.selection.getNode(),"class","").indexOf("mceItem")!=-1){return}a.windowManager.open({file:b+"/image.htm",width:480+parseInt(a.getLang("advimage.delta_width",0)),height:385+parseInt(a.getLang("advimage.delta_height",0)),inline:1},{plugin_url:b})});a.addButton("image",{title:"advimage.image_desc",cmd:"mceAdvImage"})},getInfo:function(){return{longname:"Advanced image",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("advimage",tinymce.plugins.AdvancedImagePlugin)})();