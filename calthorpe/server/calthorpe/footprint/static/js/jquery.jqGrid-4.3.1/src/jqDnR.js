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

/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.19 +r2
 */

(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.fn.jqResize=function(h,ar){return i(this,h,'r',ar);};
$.jqDnR={
	dnr:{},
	e:0,
	drag:function(v){
 		if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
 		else {
			E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
			if(M1){E1.css({width:Math.max(v.pageX-M1.pX+M1.W,0),height:Math.max(v.pageY-M1.pY+M1.H,0)});}
		}
  		return false;
  	},
	stop:function(){
		//E.css('opacity',M.o);
		$(document).unbind('mousemove',J.drag).unbind('mouseup',J.stop);
	}
};
var J=$.jqDnR,M=J.dnr,E=J.e,E1,
i=function(e,h,k,aR){
	return e.each(function(){
		h=(h)?$(h,e):e;
 		h.bind('mousedown',{e:e,k:k},function(v){
 			var d=v.data,p={};E=d.e;E1 = aR ? $(aR) : false;
 			// attempt utilization of dimensions plugin to fix IE issues
 			if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
 			M={
 				X:p.left||f('left')||0,
 				Y:p.top||f('top')||0,
 				W:f('width')||E[0].scrollWidth||0,
 				H:f('height')||E[0].scrollHeight||0,
 				pX:v.pageX,
 				pY:v.pageY,
 				k:d.k
 				//o:E.css('opacity')
 			};
			// also resize
			if(E1 && d.k != 'd'){
 				M1={
					X:p.left||f1('left')||0,
					Y:p.top||f1('top')||0,
					W:E1[0].offsetWidth||f1('width')||0,
					H:E1[0].offsetHeight||f1('height')||0,
					pX:v.pageX,
					pY:v.pageY,
					k:d.k
				};
			} else {M1 = false;}			
 			//E.css({opacity:0.8});
			if($("input.hasDatepicker",E[0])[0]) {
			try {$("input.hasDatepicker",E[0]).datepicker('hide');}catch (dpe){}
			}
 			$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
 			return false;
 		});
	});
},
f=function(k){return parseInt(E.css(k))||false;};
f1=function(k){	return parseInt(E1.css(k))||false;};
})(jQuery);