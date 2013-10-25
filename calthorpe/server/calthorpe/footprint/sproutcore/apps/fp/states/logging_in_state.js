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


Footprint.LoggingInState = SC.State.extend({
  
    enterState: function() {
        Footprint.loginController.set('content', Footprint.loginContent);
        var cookie = Footprint.userController.findCookie();
        if (cookie && cookie.get('value')) {
            Footprint.loginController.set('api_key', cookie.get('value'));
            this.gotoState('loadingUserState');
            return;
        }
        Footprint.loginPage.get('mainPane').append();
    },

    exitState: function() {
        Footprint.getPath('loginPage.mainPane').remove();
    },

    doAuthenticate: function() {
        if (Footprint.loginController.get('username') && Footprint.loginController.get('password')) {
            this.gotoState('loadingUserState')
        }
        else {
            this.gotoState('missingLoginInfoState')
        }
    },

    initialSubstate: 'loginReadyState',
    loginReadyState: SC.State.extend({

    }),

    missingLoginInfoState: SC.State.extend({
        enterState: function() {
            SC.AlertPane.error("Missing user or password");
            this.gotoState('loginReadyState');
        }
    }),

    loadingUserState: Footprint.LoadingState.extend({

        loadingController:Footprint.userController,
        didLoadEvent:'didLoadUser',
        didFailEvent:'didFailToLoadUser',

        /**
         * Queries for all the scenarios of the ConfigEntity
         * @returns {*}
         */
        recordArray:function() {
            return Footprint.store.find(
                SC.Query.create({
                    recordType: Footprint.User,
                    location:SC.Query.REMOTE,
                    parameters:$.extend(
                    Footprint.loginController.get('username') && Footprint.loginController.get('password') ?
                    {
                        username: Footprint.loginController.get('username'),
                        password: Footprint.loginController.get('password')
                    } : {},
                    Footprint.loginController.get('api_key') ?
                    {
                        api_key: Footprint.loginController.get('api_key')
                    } : {})
                }));
        }
    }),

    didLoadUser: function(){
        if (Footprint.userController.get('status') & Footprint.Record.READY) {
            if (Footprint.userController.get('length') == 1) {
                // Put the user apiKey in the cache
                Footprint.userController.setCookie(24*60*60*1000);
                // All good, go to the loading page
                this.gotoState('loadingAppState');
            } else {
                SC.AlertPane.error("A login error occurred");
                Footprint.userController.set('content', null);
                Footprint.loginController.set('password', null);
                this.gotoState('loginReadyState');
            }
        }
    },

    didFailToLoadUser: function() {
        SC.AlertPane.error("Authentication Failed");
        this.gotoState('loginReadyState');
    }
});

