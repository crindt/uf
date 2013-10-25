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

// ==========================================================================
// Project:   SCTable - JavaScript Framework
// Copyright: ©2011 Jonathan Lewis and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals SCTable*/

/*
  Defines an internal communication API for the TableView components.  Not meant to
  be used externally.
*/

SCTable.TableColumnsDelegate = {

  // PUBLIC PROPERTIES
  
  isTableColumnsDelegate: YES,
    
  // PUBLIC METHODS

  beginColumnResizeDrag: function(evt, col, colIndex) {
    //console.log('%@.beginResizeDrag()'.fmt(this));
  },
  
  updateColumnResizeDrag: function(evt, col, colIndex, newWidth) {
    //console.log('%@.updateResizeDrag()'.fmt(this));
  },

  endColumnResizeDrag: function(evt, col, colIndex, newWidth) {
    //console.log('%@.endResizeDrag()'.fmt(this));
  },
  
  tableColumnDidRequestSort: function(col, colIndex, direction) {
    //console.log('%@.tableColumnDidRequestSort(col: %@, colIndex: %@, direction: %@)'.fmt(this, col, colIndex, direction));
  }

};
