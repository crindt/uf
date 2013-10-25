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

(function(){tinymce.create("tinymce.plugins.IESpell",{init:function(a,b){var c=this,d;if(!tinymce.isIE){return}c.editor=a;a.addCommand("mceIESpell",function(){try{d=new ActiveXObject("ieSpell.ieSpellExtension");d.CheckDocumentNode(a.getDoc().documentElement)}catch(f){if(f.number==-2146827859){a.windowManager.confirm(a.getLang("iespell.download"),function(e){if(e){window.open("http://www.iespell.com/download.php","ieSpellDownload","")}})}else{a.windowManager.alert("Error Loading ieSpell: Exception "+f.number)}}});a.addButton("iespell",{title:"iespell.iespell_desc",cmd:"mceIESpell"})},getInfo:function(){return{longname:"IESpell (IE Only)",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/iespell",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("iespell",tinymce.plugins.IESpell)})();