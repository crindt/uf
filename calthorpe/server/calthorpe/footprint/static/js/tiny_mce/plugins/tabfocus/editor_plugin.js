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

(function(){var c=tinymce.DOM,a=tinymce.dom.Event,d=tinymce.each,b=tinymce.explode;tinymce.create("tinymce.plugins.TabFocusPlugin",{init:function(f,g){function e(i,j){if(j.keyCode===9){return a.cancel(j)}}function h(l,p){var j,m,o,n,k;function q(t){n=c.select(":input:enabled,*[tabindex]:not(iframe)");function s(v){return v.nodeName==="BODY"||(v.type!="hidden"&&!(v.style.display=="none")&&!(v.style.visibility=="hidden")&&s(v.parentNode))}function i(v){return v.attributes.tabIndex.specified||v.nodeName=="INPUT"||v.nodeName=="TEXTAREA"}function u(){return tinymce.isIE6||tinymce.isIE7}function r(v){return((!u()||i(v)))&&v.getAttribute("tabindex")!="-1"&&s(v)}d(n,function(w,v){if(w.id==l.id){j=v;return false}});if(t>0){for(m=j+1;m<n.length;m++){if(r(n[m])){return n[m]}}}else{for(m=j-1;m>=0;m--){if(r(n[m])){return n[m]}}}return null}if(p.keyCode===9){k=b(l.getParam("tab_focus",l.getParam("tabfocus_elements",":prev,:next")));if(k.length==1){k[1]=k[0];k[0]=":prev"}if(p.shiftKey){if(k[0]==":prev"){n=q(-1)}else{n=c.get(k[0])}}else{if(k[1]==":next"){n=q(1)}else{n=c.get(k[1])}}if(n){if(n.id&&(l=tinymce.get(n.id||n.name))){l.focus()}else{window.setTimeout(function(){if(!tinymce.isWebKit){window.focus()}n.focus()},10)}return a.cancel(p)}}}f.onKeyUp.add(e);if(tinymce.isGecko){f.onKeyPress.add(h);f.onKeyDown.add(e)}else{f.onKeyDown.add(h)}},getInfo:function(){return{longname:"Tabfocus",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/tabfocus",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("tabfocus",tinymce.plugins.TabFocusPlugin)})();