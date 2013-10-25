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

(function(){var a=tinymce.dom.Event,c=tinymce.each,b=tinymce.DOM;tinymce.create("tinymce.plugins.ContextMenu",{init:function(f){var i=this,g,d,j,e;i.editor=f;d=f.settings.contextmenu_never_use_native;i.onContextMenu=new tinymce.util.Dispatcher(this);e=function(k){h(f,k)};g=f.onContextMenu.add(function(k,l){if((j!==0?j:l.ctrlKey)&&!d){return}a.cancel(l);if(l.target.nodeName=="IMG"){k.selection.select(l.target)}i._getMenu(k).showMenu(l.clientX||l.pageX,l.clientY||l.pageY);a.add(k.getDoc(),"click",e);k.nodeChanged()});f.onRemove.add(function(){if(i._menu){i._menu.removeAll()}});function h(k,l){j=0;if(l&&l.button==2){j=l.ctrlKey;return}if(i._menu){i._menu.removeAll();i._menu.destroy();a.remove(k.getDoc(),"click",e);i._menu=null}}f.onMouseDown.add(h);f.onKeyDown.add(h);f.onKeyDown.add(function(k,l){if(l.shiftKey&&!l.ctrlKey&&!l.altKey&&l.keyCode===121){a.cancel(l);g(k,l)}})},getInfo:function(){return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_getMenu:function(e){var g=this,d=g._menu,j=e.selection,f=j.isCollapsed(),h=j.getNode()||e.getBody(),i,k;if(d){d.removeAll();d.destroy()}k=b.getPos(e.getContentAreaContainer());d=e.controlManager.createDropMenu("contextmenu",{offset_x:k.x+e.getParam("contextmenu_offset_x",0),offset_y:k.y+e.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:true});g._menu=d;d.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(f);d.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(f);d.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"});if((h.nodeName=="A"&&!e.dom.getAttrib(h,"name"))||!f){d.addSeparator();d.add({title:"advanced.link_desc",icon:"link",cmd:e.plugins.advlink?"mceAdvLink":"mceLink",ui:true});d.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})}d.addSeparator();d.add({title:"advanced.image_desc",icon:"image",cmd:e.plugins.advimage?"mceAdvImage":"mceImage",ui:true});d.addSeparator();i=d.addMenu({title:"contextmenu.align"});i.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"});i.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"});i.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"});i.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"});g.onContextMenu.dispatch(g,d,h,f);return d}});tinymce.PluginManager.add("contextmenu",tinymce.plugins.ContextMenu)})();