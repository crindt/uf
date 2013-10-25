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

(function(){tinymce.create("tinymce.plugins.Directionality",{init:function(a,b){var c=this;c.editor=a;a.addCommand("mceDirectionLTR",function(){var d=a.dom.getParent(a.selection.getNode(),a.dom.isBlock);if(d){if(a.dom.getAttrib(d,"dir")!="ltr"){a.dom.setAttrib(d,"dir","ltr")}else{a.dom.setAttrib(d,"dir","")}}a.nodeChanged()});a.addCommand("mceDirectionRTL",function(){var d=a.dom.getParent(a.selection.getNode(),a.dom.isBlock);if(d){if(a.dom.getAttrib(d,"dir")!="rtl"){a.dom.setAttrib(d,"dir","rtl")}else{a.dom.setAttrib(d,"dir","")}}a.nodeChanged()});a.addButton("ltr",{title:"directionality.ltr_desc",cmd:"mceDirectionLTR"});a.addButton("rtl",{title:"directionality.rtl_desc",cmd:"mceDirectionRTL"});a.onNodeChange.add(c._nodeChange,c)},getInfo:function(){return{longname:"Directionality",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/directionality",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_nodeChange:function(b,a,e){var d=b.dom,c;e=d.getParent(e,d.isBlock);if(!e){a.setDisabled("ltr",1);a.setDisabled("rtl",1);return}c=d.getAttrib(e,"dir");a.setActive("ltr",c=="ltr");a.setDisabled("ltr",0);a.setActive("rtl",c=="rtl");a.setDisabled("rtl",0)}});tinymce.PluginManager.add("directionality",tinymce.plugins.Directionality)})();