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

(function(){tinymce.create("tinymce.plugins.AutolinkPlugin",{init:function(a,b){var c=this;a.onKeyDown.addToTop(function(d,f){if(f.keyCode==13){return c.handleEnter(d)}});if(tinyMCE.isIE){return}a.onKeyPress.add(function(d,f){if(f.which==41){return c.handleEclipse(d)}});a.onKeyUp.add(function(d,f){if(f.keyCode==32){return c.handleSpacebar(d)}})},handleEclipse:function(a){this.parseCurrentLine(a,-1,"(",true)},handleSpacebar:function(a){this.parseCurrentLine(a,0,"",true)},handleEnter:function(a){this.parseCurrentLine(a,-1,"",false)},parseCurrentLine:function(i,d,b,g){var a,f,c,n,k,m,h,e,j;a=i.selection.getRng(true).cloneRange();if(a.startOffset<5){e=a.endContainer.previousSibling;if(e==null){if(a.endContainer.firstChild==null||a.endContainer.firstChild.nextSibling==null){return}e=a.endContainer.firstChild.nextSibling}j=e.length;a.setStart(e,j);a.setEnd(e,j);if(a.endOffset<5){return}f=a.endOffset;n=e}else{n=a.endContainer;if(n.nodeType!=3&&n.firstChild){while(n.nodeType!=3&&n.firstChild){n=n.firstChild}a.setStart(n,0);a.setEnd(n,n.nodeValue.length)}if(a.endOffset==1){f=2}else{f=a.endOffset-1-d}}c=f;do{a.setStart(n,f-2);a.setEnd(n,f-1);f-=1}while(a.toString()!=" "&&a.toString()!=""&&a.toString().charCodeAt(0)!=160&&(f-2)>=0&&a.toString()!=b);if(a.toString()==b||a.toString().charCodeAt(0)==160){a.setStart(n,f);a.setEnd(n,c);f+=1}else{if(a.startOffset==0){a.setStart(n,0);a.setEnd(n,c)}else{a.setStart(n,f);a.setEnd(n,c)}}var m=a.toString();if(m.charAt(m.length-1)=="."){a.setEnd(n,c-1)}m=a.toString();h=m.match(/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+-]+@)(.+)$/i);if(h){if(h[1]=="www."){h[1]="http://www."}else{if(/@$/.test(h[1])&&!/^mailto:/.test(h[1])){h[1]="mailto:"+h[1]}}k=i.selection.getBookmark();i.selection.setRng(a);tinyMCE.execCommand("createlink",false,h[1]+h[2]);i.selection.moveToBookmark(k);i.nodeChanged();if(tinyMCE.isWebKit){i.selection.collapse(false);var l=Math.min(n.length,c+1);a.setStart(n,l);a.setEnd(n,l);i.selection.setRng(a)}}},getInfo:function(){return{longname:"Autolink",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autolink",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("autolink",tinymce.plugins.AutolinkPlugin)})();