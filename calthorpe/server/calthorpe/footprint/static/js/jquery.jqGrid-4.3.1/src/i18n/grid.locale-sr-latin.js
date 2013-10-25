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
 * jqGrid Serbian latin Translation
 * Bild Studio info@bild-studio.net
 * http://www.bild-studio.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {
	defaults : {
		recordtext: "Pregled {0} - {1} od {2}",
		emptyrecords: "Ne postoji nijedan zapis",
		loadtext: "Učitivanje...",
		pgtext : "Strana {0} od {1}"
	},
	search : {
		caption: "Traženje...",
		Find: "Traži",
		Reset: "Resetuj",
		odata : ['jednako', 'nije jednako', 'manje', 'manje ili jednako','veće','veće ili jednako', 'počinje sa','ne počinje sa','je u','nije u','završava sa','ne završava sa','sadrži','ne sadrži'],
		groupOps: [	{ op: "AND", text: "sva" },	{ op: "OR",  text: "bilo koje" }	],
		matchText: " primeni",
		rulesText: " pravila"
	},
	edit : {
		addCaption: "Dodaj zapis",
		editCaption: "Izmeni zapis",
		bSubmit: "Pošalji",
		bCancel: "Odustani",
		bClose: "Zatvori",
		saveData: "Podatak je izmenjen! Sačuvaj izmene?",
		bYes : "Da",
		bNo : "Ne",
		bExit : "Odustani",
		msg: {
			required: "Polje je obavezno",
			number: "Unesite ispravan broj",
			minValue: "vrednost mora biti veća od ili jednaka sa ",
			maxValue: "vrednost mora biti manja ili jednaka sa",
			email: "nije ispravna email adresa, nije valjda da ne umeš ukucati mail!?",
			integer: "Unesi celobrojnu vrednost ",
			date: "Unesite ispravan datum",
			url: "nije ispravan URL. Potreban je prefiks ('http://' or 'https://')",
			nodefined : " nije definisan!",
			novalue : " zahtevana je povratna vrednost!",
			customarray : "Prilagođena funkcija treba da vrati niz!",
			customfcheck : "Prilagođena funkcija treba da bude prisutana u slučaju prilagođene provere!"
			
		}
	},
	view : {
		caption: "Pogledaj zapis",
		bClose: "Zatvori"
	},
	del : {
		caption: "Izbrisi",
		msg: "Izbrisi izabran(e) zapise(e)?",
		bSubmit: "Izbriši",
		bCancel: "Odbaci"
	},
	nav : {
		edittext: "",
		edittitle: "Izmeni izabrani red",
		addtext:"",
		addtitle: "Dodaj novi red",
		deltext: "",
		deltitle: "Izbriši izabran red",
		searchtext: "",
		searchtitle: "Nađi zapise",
		refreshtext: "",
		refreshtitle: "Ponovo učitaj podatke",
		alertcap: "Upozorenje",
		alerttext: "Izaberite red",
		viewtext: "",
		viewtitle: "Pogledaj izabrani red"
	},
	col : {
		caption: "Izaberi kolone",
		bSubmit: "OK",
		bCancel: "Odbaci"
	},
	errors : {
		errcap : "Greška",
		nourl : "Nije postavljen URL",
		norecords: "Nema zapisa za obradu",
		model : "Dužina modela colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub",
				"Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec",
				"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "n/j/Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "F, Y"
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
