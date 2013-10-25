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
// Project:   Footprint.loginController
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Footprint */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

sc_require('models/identification_models');

/***
 * User controller expects a single item list or single Footprint.User record set to its content property
 * @type {SC.Object}
 */
Footprint.userController = SC.ArrayController.create( Footprint.ArrayContentSupport, {
    setCookie: function(duration) {
        var cookie = this.findCookie() ||
            SC.Cookie.create({
            name: 'user.api_key',
            value: Footprint.userController.getPath('firstObject.api_key')
        });
        if (duration) {
            var d = new Date();
            d.setTime(d.getTime() + duration);
            cookie.expires = d;
        }
        else
            cookie.expires = null;
        cookie.write();
    },
    destroyCookie: function() {
        var cookie = this.findCookie();
        if (cookie)
            cookie.destroy()
    },
    findCookie: function() {
        return SC.Cookie.find('user.api_key');
    }
});
