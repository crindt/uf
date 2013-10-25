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

(function(){tinymce.create("tinymce.plugins.BBCodePlugin",{init:function(a,b){var d=this,c=a.getParam("bbcode_dialect","punbb").toLowerCase();a.onBeforeSetContent.add(function(e,f){f.content=d["_"+c+"_bbcode2html"](f.content)});a.onPostProcess.add(function(e,f){if(f.set){f.content=d["_"+c+"_bbcode2html"](f.content)}if(f.get){f.content=d["_"+c+"_html2bbcode"](f.content)}})},getInfo:function(){return{longname:"BBCode Plugin",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/bbcode",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_punbb_html2bbcode:function(a){a=tinymce.trim(a);function b(c,d){a=a.replace(c,d)}b(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi,"[url=$1]$2[/url]");b(/<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi,"[code][color=$1]$2[/color][/code]");b(/<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi,"[quote][color=$1]$2[/color][/quote]");b(/<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[code][color=$1]$2[/color][/code]");b(/<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[quote][color=$1]$2[/color][/quote]");b(/<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi,"[color=$1]$2[/color]");b(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[color=$1]$2[/color]");b(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi,"[size=$1]$2[/size]");b(/<font>(.*?)<\/font>/gi,"$1");b(/<img.*?src=\"(.*?)\".*?\/>/gi,"[img]$1[/img]");b(/<span class=\"codeStyle\">(.*?)<\/span>/gi,"[code]$1[/code]");b(/<span class=\"quoteStyle\">(.*?)<\/span>/gi,"[quote]$1[/quote]");b(/<strong class=\"codeStyle\">(.*?)<\/strong>/gi,"[code][b]$1[/b][/code]");b(/<strong class=\"quoteStyle\">(.*?)<\/strong>/gi,"[quote][b]$1[/b][/quote]");b(/<em class=\"codeStyle\">(.*?)<\/em>/gi,"[code][i]$1[/i][/code]");b(/<em class=\"quoteStyle\">(.*?)<\/em>/gi,"[quote][i]$1[/i][/quote]");b(/<u class=\"codeStyle\">(.*?)<\/u>/gi,"[code][u]$1[/u][/code]");b(/<u class=\"quoteStyle\">(.*?)<\/u>/gi,"[quote][u]$1[/u][/quote]");b(/<\/(strong|b)>/gi,"[/b]");b(/<(strong|b)>/gi,"[b]");b(/<\/(em|i)>/gi,"[/i]");b(/<(em|i)>/gi,"[i]");b(/<\/u>/gi,"[/u]");b(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi,"[u]$1[/u]");b(/<u>/gi,"[u]");b(/<blockquote[^>]*>/gi,"[quote]");b(/<\/blockquote>/gi,"[/quote]");b(/<br \/>/gi,"\n");b(/<br\/>/gi,"\n");b(/<br>/gi,"\n");b(/<p>/gi,"");b(/<\/p>/gi,"\n");b(/&nbsp;|\u00a0/gi," ");b(/&quot;/gi,'"');b(/&lt;/gi,"<");b(/&gt;/gi,">");b(/&amp;/gi,"&");return a},_punbb_bbcode2html:function(a){a=tinymce.trim(a);function b(c,d){a=a.replace(c,d)}b(/\n/gi,"<br />");b(/\[b\]/gi,"<strong>");b(/\[\/b\]/gi,"</strong>");b(/\[i\]/gi,"<em>");b(/\[\/i\]/gi,"</em>");b(/\[u\]/gi,"<u>");b(/\[\/u\]/gi,"</u>");b(/\[url=([^\]]+)\](.*?)\[\/url\]/gi,'<a href="$1">$2</a>');b(/\[url\](.*?)\[\/url\]/gi,'<a href="$1">$1</a>');b(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" />');b(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<font color="$1">$2</font>');b(/\[code\](.*?)\[\/code\]/gi,'<span class="codeStyle">$1</span>&nbsp;');b(/\[quote.*?\](.*?)\[\/quote\]/gi,'<span class="quoteStyle">$1</span>&nbsp;');return a}});tinymce.PluginManager.add("bbcode",tinymce.plugins.BBCodePlugin)})();