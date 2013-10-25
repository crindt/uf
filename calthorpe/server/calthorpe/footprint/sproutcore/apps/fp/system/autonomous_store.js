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

// SC.Store (for autonomous nested stores)
SC.Store.reopen({
  chainAutonomousStore: function(attrs, newStoreClass) {
    var newAttrs = attrs ? SC.clone( attrs ) : {};
    var source  = this._getDataSource();

    newAttrs.dataSource = source;
    return this.chain( newAttrs, newStoreClass );
  }
});

// SC.NestedStore (for autonomous nested stores)
SC.NestedStore.reopen({
  chainAutonomousStore: function(attrs, newStoreClass) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  commitRecords: function(recordTypes, ids, storeKeys) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  commitRecord: function(recordType, id, storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  cancelRecords: function(recordTypes, ids, storeKeys) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  cancelRecord: function(recordType, id, storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  dataSourceDidCancel: function(storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  dataSourceDidComplete: function(storeKey, dataHash, newId) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  dataSourceDidDestroy: function(storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  dataSourceDidError: function(storeKey, error) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  pushRetrieve: function(recordType, id, dataHash, storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  pushDestroy: function(recordType, id, storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  pushError: function(recordType, id, error, storeKey) {
    if( this.get( "dataSource" ) )
      return sc_super();
    else
      throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  }
  
});
