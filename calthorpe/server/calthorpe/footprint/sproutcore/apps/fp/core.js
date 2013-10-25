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
// Project:   Footprint
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Footprint */
sc_require('controllers/controller_extensions');
sc_require('system/autonomous_store');

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
//SC.LOG_OBSERVERS = YES;
F = Footprint = SC.Application.create(
  /** @scope Footprint.prototype */ {

  NAMESPACE: 'Footprint',
  VERSION: '0.1.0',

  // We do this primitive check to flag the development mode. There might be a built-in flag.
  isDevelopment:window.location.port==4020,

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from('Footprint.FixturesDataSource')

        // Here is the server connector that replaces the fixtures connector
  store: SC.Store.create({
      commitRecordsAutomatically: NO
  }).from('Footprint.DataSource')
});
