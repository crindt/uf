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

﻿;(function($){
/**
 * jqGrid English Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {
	defaults : {
		recordtext: "Pregled {0} - {1} od {2}",
		emptyrecords: "Nema zapisa",
		loadtext: "Učitavam...",
		pgtext : "Stranica {0} od {1}"
	},
	search : {
		caption: "pretraživanje...",
		Find: "Traži",
		Reset: "Poništi",
		odata : ['jednak', 'nije identičan', 'manje', 'manje ili identično','veće','veše ili identično', 'počinje sa','ne počinje sa ','je u','nije u','završava sa','ne završava sa','sadrži','ne sadrži'],
		groupOps: [	{ op: "U", text: "sve" },	{ op: "ILI",  text: "bilo koji" }	],
		matchText: " podudata se",
		rulesText: " pravila"
	},
	edit : {
		addCaption: "Dodaj zapis",
		editCaption: "Promijeni zapis",
		bSubmit: "Preuzmi",
		bCancel: "Odustani",
		bClose: "Zatvri",
		saveData: "Podaci su promijenjeni! Preuzmi promijene?",
		bYes : "Da",
		bNo : "Ne",
		bExit : "Odustani",
		msg: {
			required:"Polje je obavezno",
			number:"Molim, unesite ispravan broj",
			minValue:"vrijednost mora biti veća ili identična ",
			maxValue:"vrijednost mora biti manja ili identična",
			email: "neispravan e-mail",
			integer: "Molim, unjeti ispravan cijeli broj (integer)",
			date: "Molim, unjeti ispravan datum ",
			url: "neispravan URL. Prefiks je obavezan ('http://' or 'https://')",
			nodefined : " nije definiran!",
			novalue : " zahtjevan podatak je obavezan!",
			customarray : "Opcionalna funkcija trebala bi bili polje (array)!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Otvori zapis",
		bClose: "Zatvori"
	},
	del : {
		caption: "Obriši",
		msg: "Obriši označen zapis ili više njih?",
		bSubmit: "Obriši",
		bCancel: "Odustani"
	},
	nav : {
		edittext: "",
		edittitle: "Promijeni obilježeni red",
		addtext:"",
		addtitle: "Dodaj novi red",
		deltext: "",
		deltitle: "Obriši obilježeni red",
		searchtext: "",
		searchtitle: "Potraži zapise",
		refreshtext: "",
		refreshtitle: "Ponovo preuzmi podatke",
		alertcap: "Upozorenje",
		alerttext: "Molim, odaberi red",
		viewtext: "",
		viewtitle: "Pregled obilježenog reda"
	},
	col : {
		caption: "Obilježi kolonu",
		bSubmit: "Uredu",
		bCancel: "Odustani"
	},
	errors : {
		errcap : "Greška",
		nourl : "Nedostaje URL",
		norecords: "Bez zapisa za obradu",
		model : "Duljina colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub",
				"Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"
			],
			monthNames: [
				"Sij", "Vel", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro",
				"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return ''},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y.',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "j.n.Y.",
				LongDate: "l, j. F Y",
				FullDateTime: "l, d. F Y G:i:s",
				MonthDay: "d. F",
				ShortTime: "G:i",
				LongTime: "G:i:s",
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
