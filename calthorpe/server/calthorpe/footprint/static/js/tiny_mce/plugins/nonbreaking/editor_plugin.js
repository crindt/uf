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

(function(){tinymce.create("tinymce.plugins.Nonbreaking",{init:function(a,b){var c=this;c.editor=a;a.addCommand("mceNonBreaking",function(){a.execCommand("mceInsertContent",false,(a.plugins.visualchars&&a.plugins.visualchars.state)?'<span data-mce-bogus="1" class="mceItemHidden mceItemNbsp">&nbsp;</span>':"&nbsp;")});a.addButton("nonbreaking",{title:"nonbreaking.nonbreaking_desc",cmd:"mceNonBreaking"});if(a.getParam("nonbreaking_force_tab")){a.onKeyDown.add(function(d,f){if(f.keyCode==9){f.preventDefault();d.execCommand("mceNonBreaking");d.execCommand("mceNonBreaking");d.execCommand("mceNonBreaking")}})}},getInfo:function(){return{longname:"Nonbreaking space",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/nonbreaking",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("nonbreaking",tinymce.plugins.Nonbreaking)})();