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

(function(a){a.jgrid={defaults:{recordtext:"Visualizzati {0} - {1} di {2}",emptyrecords:"Nessun record da visualizzare",loadtext:"Caricamento...",pgtext:"Pagina {0} di {1}"},search:{caption:"Ricerca...",Find:"Cerca",Reset:"Pulisci",odata:["uguale","diverso","minore","minore o uguale","maggiore","maggiore o uguale","inizia con","non inizia con","in","non in","termina con","non termina con","contiene","non contiene"],groupOps:[{op:"AND",text:"tutto"},{op:"OR",text:"almeno uno"}],matchText:" corrisponde",rulesText:" regole"},edit:{addCaption:"Aggiungi Record",editCaption:"Modifica Record",bSubmit:"Invia",bCancel:"Chiudi",bClose:"Chiudi",saveData:"Alcuni dati modificati! Salvare i cambiamenti?",bYes:"Si",bNo:"No",bExit:"Esci",msg:{required:"Campo richiesto",number:"Per favore, inserisci un valore valido",minValue:"il valore deve essere maggiore o uguale a ",maxValue:"il valore deve essere minore o uguale a",email:"e-mail non corretta",integer:"Per favore, inserisci un numero intero valido",date:"Per favore, inserisci una data valida",url:"URL non valido. Prefisso richiesto ('http://' or 'https://')",nodefined:" non è definito!",novalue:" valore di ritorno richiesto!",customarray:"La function custon deve tornare un array!",customfcheck:"La function custom deve esistere per il custom checking!"}},view:{caption:"Visualizzazione Record",bClose:"Chiudi"},del:{caption:"Cancella",msg:"Cancellare record selezionato/i?",bSubmit:"Cancella",bCancel:"Annulla"},nav:{edittext:" ",edittitle:"Modifica record selezionato",addtext:" ",addtitle:"Aggiungi nuovo record",deltext:" ",deltitle:"Cancella record selezionato",searchtext:" ",searchtitle:"Ricerca record",refreshtext:"",refreshtitle:"Aggiorna griglia",alertcap:"Attenzione",alerttext:"Per favore, seleziona un record",viewtext:"",viewtitle:"Visualizza riga selezionata"},col:{caption:"Mostra/Nascondi Colonne",bSubmit:"Invia",bCancel:"Annulla"},errors:{errcap:"Errore",nourl:"Url non settata",norecords:"Nessun record da elaborare",model:"Lunghezza di colNames &lt;&gt; colModel!"},formatter:{integer:{thousandsSeparator:" ",defaultValue:"0"},number:{decimalSeparator:",",thousandsSeparator:" ",decimalPlaces:2,defaultValue:"0,00"},currency:{decimalSeparator:",",thousandsSeparator:" ",decimalPlaces:2,prefix:"",suffix:"",defaultValue:"0,00"},date:{dayNames:["Dom","Lun","Mar","Mer","Gio","Ven","Sab","Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],monthNames:["Gen","Feb","Mar","Apr","Mag","Gui","Lug","Ago","Set","Ott","Nov","Dic","Genneio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Movembre","Dicembre"],AmPm:["am","pm","AM","PM"],S:function(b){return b<11||b>13?["st","nd","rd","th"][Math.min((b-1)%10,3)]:"th"},srcformat:"Y-m-d",newformat:"d/m/Y",masks:{ISO8601Long:"Y-m-d H:i:s",ISO8601Short:"Y-m-d",ShortDate:"n/j/Y",LongDate:"l, F d, Y",FullDateTime:"l, F d, Y g:i:s A",MonthDay:"F d",ShortTime:"g:i A",LongTime:"g:i:s A",SortableDateTime:"Y-m-d\\TH:i:s",UniversalSortableDateTime:"Y-m-d H:i:sO",YearMonth:"F, Y"},reformatAfterEdit:false},baseLinkUrl:"",showAction:"",target:"",checkbox:{disabled:true},idName:"id"}}})(jQuery);