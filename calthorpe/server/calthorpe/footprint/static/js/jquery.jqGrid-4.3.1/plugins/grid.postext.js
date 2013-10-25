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

;(function($){
/**
 * jqGrid extension
 * Paul Tiseo ptiseo@wasteconsultants.com
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
$.jgrid.extend({
	getPostData : function(){
		var $t = this[0];
		if(!$t.grid) { return; }
		return $t.p.postData;
	},
	setPostData : function( newdata ) {
		var $t = this[0];
		if(!$t.grid) { return; }
		// check if newdata is correct type
		if ( typeof(newdata) === 'object' ) {
			$t.p.postData = newdata;
		}
		else {
			alert("Error: cannot add a non-object postData value. postData unchanged.");
		}
	},
	appendPostData : function( newdata ) { 
		var $t = this[0];
		if(!$t.grid) { return; }
		// check if newdata is correct type
		if ( typeof(newdata) === 'object' ) {
			$.extend($t.p.postData, newdata);
		}
		else {
			alert("Error: cannot append a non-object postData value. postData unchanged.");
		}
	},
	setPostDataItem : function( key, val ) {
		var $t = this[0];
		if(!$t.grid) { return; }
		$t.p.postData[key] = val;
	},
	getPostDataItem : function( key ) {
		var $t = this[0];
		if(!$t.grid) { return; }
		return $t.p.postData[key];
	},
	removePostDataItem : function( key ) {
		var $t = this[0];
		if(!$t.grid) { return; }
		delete $t.p.postData[key];
	},
	getUserData : function(){
		var $t = this[0];
		if(!$t.grid) { return; }
		return $t.p.userData;
	},
	getUserDataItem : function( key ) {
		var $t = this[0];
		if(!$t.grid) { return; }
		return $t.p.userData[key];
	}
});
})(jQuery);