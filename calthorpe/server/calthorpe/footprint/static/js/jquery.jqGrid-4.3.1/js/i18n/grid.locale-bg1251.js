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
 * jqGrid Bulgarian Translation 
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {
	defaults : {
		recordtext: "{0} - {1} �� {2}",
		emptyrecords: "���� �����(�)",
		loadtext: "��������...",
		pgtext : "���. {0} �� {1}"
	},
	search : {
		caption: "�������...",
		Find: "������",
		Reset: "�������",
		odata : ['�����', '��������', '��-�����', '��-����� ���=','��-������','��-������ ��� =', '������� �','�� ������� �','�� ������ �','�� �� ������ �','�������� �','�� ��������� �','�������', '�� �������' ],
	    groupOps: [	{ op: "AND", text: " � " },	{ op: "OR",  text: "���" }	],
		matchText: " ������",
		rulesText: " ������"
	},
	edit : {
		addCaption: "��� �����",
		editCaption: "�������� �����",
		bSubmit: "������",
		bCancel: "�����",
		bClose: "�������",
		saveData: "������� �� ���������! �� ������� �� ���������?",
		bYes : "��",
		bNo : "��",
		bExit : "�����",
		msg: {
		    required:"������ � ������������",
		    number:"�������� ������� �����!",
		    minValue:"���������� ������ �� � ��-������ ��� ����� ��",
		    maxValue:"���������� ������ �� � ��-����� ��� ����� ��",
		    email: "�� � ������� ��. �����",
		    integer: "�������� ������� ���� �����",
			date: "�������� ������� ����",
			url: "e ��������� URL. �������� �� �������('http://' ��� 'https://')",
			nodefined : " � ������������!",
			novalue : " ������� ������� �� ��������!",
			customarray : "������. ������� ������ �� ����� �����!",
			customfcheck : "������������� ������� � ������������ ��� ���� ��� �������!"
		}
	},
	view : {
	    caption: "������� �����",
	    bClose: "�������"
	},
	del : {
		caption: "���������",
		msg: "�� ������ �� ��������� �����?",
		bSubmit: "������",
		bCancel: "�����"
	},
	nav : {
		edittext: " ",
		edittitle: "�������� ������ �����",
		addtext:" ",
		addtitle: "�������� ��� �����",
		deltext: " ",
		deltitle: "��������� ������ �����",
		searchtext: " ",
		searchtitle: "������� �����(�)",
		refreshtext: "",
		refreshtitle: "������ �������",
		alertcap: "��������������",
		alerttext: "����, �������� �����",
		viewtext: "",
		viewtitle: "������� ������ �����"
	},
	col : {
		caption: "����� ������",
		bSubmit: "��",
		bCancel: "�����"	
	},
	errors : {
		errcap : "������",
		nourl : "���� ������� url �����",
		norecords: "���� ����� �� ���������",
		model : "������ �� ����������� �� �������!"	
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:" ��.", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"���", "���", "��", "��", "���", "���", "���",
				"������", "����������", "�������", "�����", "���������", "�����", "������"
			],
			monthNames: [
				"���", "���", "���", "���", "���", "���", "���", "���", "���", "���", "���", "���",
				"������", "��������", "����", "�����", "���", "���", "���", "������", "���������", "��������", "�������", "��������"
			],
			AmPm : ["","","",""],
			S: function (j) {
				if(j==7 || j==8 || j== 27 || j== 28) {
					return '��';
				}
				return ['��', '��', '��'][Math.min((j - 1) % 10, 2)];
			},
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
