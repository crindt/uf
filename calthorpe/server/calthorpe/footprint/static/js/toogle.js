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


/* Stats Toogle */
$(document).ready(function(){
  $("#open-stats, #stats .close").click(function(){
    $("#stats").slideToggle()
  });
});


/* Simple Tips */
$(document).ready(function(){
  $(".simple-tips .close").click(function(){
    $(".simple-tips").slideToggle()
  });
});




/* ALERT AND DIALOG BOXES */
//<![CDATA[    
   // START ready function
   $(document).ready(function(){
 
	// TOGGLE SCRIPT
 
	$(".albox .close").click(function(event){
		$(this).parents(".albox").slideToggle();
 
		// Stop the link click from doing its normal thing
		return false;
	}); // END TOGGLE
 
   }); // END ready function
 //]]>



//<![CDATA[    
   // START ready function
   $(document).ready(function(){
 
	// TOGGLE SCRIPT
 
	$(".toggle-message .title, .toggle-message p").click(function(event){
		$(this).parents(".toggle-message").find(".hide-message").slideToggle();
 
		// Stop the link click from doing its normal thing
		return false;
	}); // END TOGGLE
 
   }); // END ready function
 //]]>





/* SUBMENU */
//<![CDATA[    
   // START ready function
   $(document).ready(function(){
 
	// TOGGLE SCRIPT
	$(".subtitle .action").click(function(event){
		$(this).parents(".subtitle").find(".submenu").slideToggle();
 
		// Stop the link click from doing its normal thing
		return false;
	}); // END TOGGLE

 
   }); // END ready function
 //]]>


