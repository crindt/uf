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

(function(){tinymce.create("tinymce.plugins.StylePlugin",{init:function(a,b){a.addCommand("mceStyleProps",function(){var c=false;var f=a.selection.getSelectedBlocks();var d=[];if(f.length===1){d.push(a.selection.getNode().style.cssText)}else{tinymce.each(f,function(g){d.push(a.dom.getAttrib(g,"style"))});c=true}a.windowManager.open({file:b+"/props.htm",width:480+parseInt(a.getLang("style.delta_width",0)),height:340+parseInt(a.getLang("style.delta_height",0)),inline:1},{applyStyleToBlocks:c,plugin_url:b,styles:d})});a.addCommand("mceSetElementStyle",function(d,c){if(e=a.selection.getNode()){a.dom.setAttrib(e,"style",c);a.execCommand("mceRepaint")}});a.onNodeChange.add(function(d,c,f){c.setDisabled("styleprops",f.nodeName==="BODY")});a.addButton("styleprops",{title:"style.desc",cmd:"mceStyleProps"})},getInfo:function(){return{longname:"Style",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/style",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("style",tinymce.plugins.StylePlugin)})();