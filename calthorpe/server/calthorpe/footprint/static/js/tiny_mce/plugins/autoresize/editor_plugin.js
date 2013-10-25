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

(function(){tinymce.create("tinymce.plugins.AutoResizePlugin",{init:function(a,c){var d=this,e=0;if(a.getParam("fullscreen_is_enabled")){return}function b(){var j,i=a.getDoc(),f=i.body,l=i.documentElement,h=tinymce.DOM,k=d.autoresize_min_height,g;g=tinymce.isIE?f.scrollHeight:(tinymce.isWebKit&&f.clientHeight==0?0:f.offsetHeight);if(g>d.autoresize_min_height){k=g}if(d.autoresize_max_height&&g>d.autoresize_max_height){k=d.autoresize_max_height;f.style.overflowY="auto";l.style.overflowY="auto"}else{f.style.overflowY="hidden";l.style.overflowY="hidden";f.scrollTop=0}if(k!==e){j=k-e;h.setStyle(h.get(a.id+"_ifr"),"height",k+"px");e=k;if(tinymce.isWebKit&&j<0){b()}}}d.editor=a;d.autoresize_min_height=parseInt(a.getParam("autoresize_min_height",a.getElement().offsetHeight));d.autoresize_max_height=parseInt(a.getParam("autoresize_max_height",0));a.onInit.add(function(f){f.dom.setStyle(f.getBody(),"paddingBottom",f.getParam("autoresize_bottom_margin",50)+"px")});a.onChange.add(b);a.onSetContent.add(b);a.onPaste.add(b);a.onKeyUp.add(b);a.onPostRender.add(b);if(a.getParam("autoresize_on_init",true)){a.onLoad.add(b);a.onLoadContent.add(b)}a.addCommand("mceAutoResize",b)},getInfo:function(){return{longname:"Auto Resize",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autoresize",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("autoresize",tinymce.plugins.AutoResizePlugin)})();