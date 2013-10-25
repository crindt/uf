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

(function(){tinymce.create("tinymce.plugins.InsertDateTime",{init:function(a,b){var c=this;c.editor=a;a.addCommand("mceInsertDate",function(){var d=c._getDateTime(new Date(),a.getParam("plugin_insertdate_dateFormat",a.getLang("insertdatetime.date_fmt")));a.execCommand("mceInsertContent",false,d)});a.addCommand("mceInsertTime",function(){var d=c._getDateTime(new Date(),a.getParam("plugin_insertdate_timeFormat",a.getLang("insertdatetime.time_fmt")));a.execCommand("mceInsertContent",false,d)});a.addButton("insertdate",{title:"insertdatetime.insertdate_desc",cmd:"mceInsertDate"});a.addButton("inserttime",{title:"insertdatetime.inserttime_desc",cmd:"mceInsertTime"})},getInfo:function(){return{longname:"Insert date/time",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/insertdatetime",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_getDateTime:function(e,a){var c=this.editor;function b(g,d){g=""+g;if(g.length<d){for(var f=0;f<(d-g.length);f++){g="0"+g}}return g}a=a.replace("%D","%m/%d/%y");a=a.replace("%r","%I:%M:%S %p");a=a.replace("%Y",""+e.getFullYear());a=a.replace("%y",""+e.getYear());a=a.replace("%m",b(e.getMonth()+1,2));a=a.replace("%d",b(e.getDate(),2));a=a.replace("%H",""+b(e.getHours(),2));a=a.replace("%M",""+b(e.getMinutes(),2));a=a.replace("%S",""+b(e.getSeconds(),2));a=a.replace("%I",""+((e.getHours()+11)%12+1));a=a.replace("%p",""+(e.getHours()<12?"AM":"PM"));a=a.replace("%B",""+c.getLang("insertdatetime.months_long").split(",")[e.getMonth()]);a=a.replace("%b",""+c.getLang("insertdatetime.months_short").split(",")[e.getMonth()]);a=a.replace("%A",""+c.getLang("insertdatetime.day_long").split(",")[e.getDay()]);a=a.replace("%a",""+c.getLang("insertdatetime.day_short").split(",")[e.getDay()]);a=a.replace("%%","%");return a}});tinymce.PluginManager.add("insertdatetime",tinymce.plugins.InsertDateTime)})();