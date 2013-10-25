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

(function(a){a.create("tinymce.plugins.EmotionsPlugin",{init:function(b,c){b.addCommand("mceEmotion",function(){b.windowManager.open({file:c+"/emotions.htm",width:250+parseInt(b.getLang("emotions.delta_width",0)),height:160+parseInt(b.getLang("emotions.delta_height",0)),inline:1},{plugin_url:c})});b.addButton("emotions",{title:"emotions.emotions_desc",cmd:"mceEmotion"})},getInfo:function(){return{longname:"Emotions",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/emotions",version:a.majorVersion+"."+a.minorVersion}}});a.PluginManager.add("emotions",a.plugins.EmotionsPlugin)})(tinymce);