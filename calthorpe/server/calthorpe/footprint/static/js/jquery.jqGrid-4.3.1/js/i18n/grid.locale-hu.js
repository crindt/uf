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
 * jqGrid Hungarian Translation
 * Őrszigety Ádám udx6bs@freemail.hu
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

$.jgrid = {
	defaults : {
		recordtext: "Oldal {0} - {1} / {2}",
		emptyrecords: "Nincs találat",
		loadtext: "Betöltés...",
		pgtext : "Oldal {0} / {1}"
	},
	search : {
		caption: "Keresés...",
		Find: "Keres",
		Reset: "Alapértelmezett",
		odata : ['egyenlő', 'nem egyenlő', 'kevesebb', 'kevesebb vagy egyenlő','nagyobb','nagyobb vagy egyenlő', 'ezzel kezdődik','nem ezzel kezdődik','tartalmaz','nem tartalmaz','végződik','nem végződik','tartalmaz','nem tartalmaz'],
		groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
		matchText: " match",
		rulesText: " rules"
	},
	edit : {
		addCaption: "Új tétel",
		editCaption: "Tétel szerkesztése",
		bSubmit: "Mentés",
		bCancel: "Mégse",
		bClose: "Bezárás",
		saveData: "A tétel megváltozott! Tétel mentése?",
		bYes : "Igen",
		bNo : "Nem",
		bExit : "Mégse",
		msg: {
			required:"Kötelező mező",
			number:"Kérjük, adjon meg egy helyes számot",
			minValue:"Nagyobb vagy egyenlőnek kell lenni mint ",
			maxValue:"Kisebb vagy egyenlőnek kell lennie mint",
			email: "hibás emailcím",
			integer: "Kérjük adjon meg egy helyes egész számot",
			date: "Kérjük adjon meg egy helyes dátumot",
			url: "nem helyes cím. Előtag kötelező ('http://' vagy 'https://')",
			nodefined : " nem definiált!",
			novalue : " visszatérési érték kötelező!!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Tétel megtekintése",
		bClose: "Bezárás"
	},
	del : {
		caption: "Törlés",
		msg: "Kiválaztott tétel(ek) törlése?",
		bSubmit: "Törlés",
		bCancel: "Mégse"
	},
	nav : {
		edittext: "",
		edittitle: "Tétel szerkesztése",
		addtext:"",
		addtitle: "Új tétel hozzáadása",
		deltext: "",
		deltitle: "Tétel törlése",
		searchtext: "",
		searchtitle: "Keresés",
		refreshtext: "",
		refreshtitle: "Frissítés",
		alertcap: "Figyelmeztetés",
		alerttext: "Kérem válasszon tételt.",
		viewtext: "",
		viewtitle: "Tétel megtekintése"
	},
	col : {
		caption: "Oszlopok kiválasztása",
		bSubmit: "Ok",
		bCancel: "Mégse"
	},
	errors : {
		errcap : "Hiba",
		nourl : "Nincs URL beállítva",
		norecords: "Nincs feldolgozásra váró tétel",
		model : "colNames és colModel hossza nem egyenlő!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo",
				"Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"
			],
			monthNames: [
				"Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec",
				"Január", "Február", "Március", "Áprili", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
			],
			AmPm : ["de","du","DE","DU"],
			S: function (j) {return '.-ik';},
			srcformat: 'Y-m-d',
			newformat: 'Y/m/d',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "Y/j/n",
				LongDate: "Y. F hó d., l",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "a g:i",
				LongTime: "a g:i:s",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "Y, F"
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
})(jQuery);
