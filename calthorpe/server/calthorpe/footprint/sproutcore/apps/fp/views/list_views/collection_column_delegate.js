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
// Project:   SC.CollectionColumnDelegate
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals SC */

/**
 @namespace

 CollectionColumnDelegates are consulted by SC.HorizontalListView to
 control the width of columns, including specifying custom widths for
 specific columns.

 You can implement a custom column width in one of two ways.

 */
SC.CollectionColumnDelegate = {

    /** walk like a duck */
    isCollectionColumnDelegate: YES,

    /**
     Default column width.  Unless you implement some custom column width
     support, this column width will be used for all items.

     @property
         @type Number
     */
    columnWidth: 300,

    /**
     Index set of columns that should have a custom column width.  If you need
     certains columns to have a custom column width, then set this property to a
     non-null value.  Otherwise leave it blank to disable custom column widths.

     @property
         @type SC.IndexSet
     */
    customColumnWidthIndexes: null,

    /**
     Called for each index in the customColumnWidthIndexes set to get the
     actual column width for the index.  This method should return the default
     columnWidth if you don't want the row to have a custom height.

     The default implementation just returns the default columnWidth.

     @param {SC.CollectionView} view the calling view
     @param {Object} content the content array
     @param {Number} contentIndex the index
     @returns {Number} column width
     */
    contentIndexColumnWidth: function(view, content, contentIndex) {
        return this.get('columnWidth');
    }

};