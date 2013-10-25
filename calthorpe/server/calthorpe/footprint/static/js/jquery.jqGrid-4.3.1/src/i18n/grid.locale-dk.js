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
 * jqGrid Danish Translation
 * Kaare Rasmussen kjs@jasonic.dk
 * http://jasonic.dk/blog 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {
	defaults : {
		recordtext: "View {0} - {1} of {2}",
	    emptyrecords: "No records to view",
		loadtext: "Loading...",
		pgtext : "Page {0} of {1}"
	},
	search : {
	    caption: "Søg...",
	    Find: "Find",
	    Reset: "Nulstil",
	    odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],
	    groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
		matchText: " match",
		rulesText: " rules"
	},
	edit : {
	    addCaption: "Tilføj",
	    editCaption: "Ret",
	    bSubmit: "Send",
	    bCancel: "Annuller",
		bClose: "Luk",
		saveData: "Data has been changed! Save changes?",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
	    msg: {
	        required:"Felt er nødvendigt",
	        number:"Indtast venligst et validt tal",
	        minValue:"værdi skal være større end eller lig med",
	        maxValue:"værdi skal være mindre end eller lig med",
	        email: "er ikke en valid email",
	        integer: "Indtast venligst et validt heltalt",
			date: "Indtast venligst en valid datoværdi",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
		}
	},
	view : {
	    caption: "View Record",
	    bClose: "Close"
	},
	del : {
	    caption: "Slet",
	    msg: "Slet valgte række(r)?",
	    bSubmit: "Slet",
	    bCancel: "Annuller"
	},
	nav : {
		edittext: " ",
	    edittitle: "Rediger valgte række",
		addtext:" ",
	    addtitle: "Tilføj ny række",
	    deltext: " ",
	    deltitle: "Slet valgte række",
	    searchtext: " ",
	    searchtitle: "Find poster",
	    refreshtext: "",
	    refreshtitle: "Indlæs igen",
	    alertcap: "Advarsel",
	    alerttext: "Vælg venligst række",
		viewtext: "",
		viewtitle: "View selected row"
	},
	col : {
	    caption: "Vis/skjul kolonner",
	    bSubmit: "Send",
	    bCancel: "Annuller"
	},
	errors : {
		errcap : "Fejl",
		nourl : "Ingel url valgt",
		norecords: "Ingen poster at behandle",
	    model : "colNames og colModel har ikke samme længde!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Søn", "Man", "Tirs", "Ons", "Tors", "Fre", "Lør",
				"Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec",
				"Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
			],
			AmPm : ["","","",""],
			S: function (j) {return '.'},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
	            ISO8601Long:"Y-m-d H:i:s",
	            ISO8601Short:"Y-m-d",
	            ShortDate: "j/n/Y",
	            LongDate: "l d. F Y",
	            FullDateTime: "l d F Y G:i:s",
	            MonthDay: "d. F",
	            ShortTime: "G:i",
	            LongTime: "G:i:s",
	            SortableDateTime: "Y-m-d\\TH:i:s",
	            UniversalSortableDateTime: "Y-m-d H:i:sO",
	            YearMonth: "F Y"
	        },
	        reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
	    target: '',
	    checkbox : {disabled:true},
		idName : 'id'
	}
};
// DK
})(jQuery);
