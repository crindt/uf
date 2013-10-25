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

// This is the theme that defines how your app renders.
//
// Your app is given its own theme so it is easier and less
// messy for you to override specific things just for your
// app.
//
// You don't have to create the whole theme on your own, though:
// your app's theme is based on SproutCore's Ace theme.
//
// NOTE: if you want to change the theme this one is based on, don't
// forget to change the :css_theme property in your buildfile.
Footprint.Theme = SC.AceTheme.create({
  name: 'footprint'
});

// SproutCore needs to know that your app's theme exists
SC.Theme.addTheme(Footprint.Theme);

// Setting it as the default theme makes every pane SproutCore
// creates default to this theme unless otherwise specified.
SC.defaultTheme = 'footprint';

var ellipsesLabelRenderDelegate = Footprint.Theme.labelRenderDelegate.extend({
    needsEllipsis:YES
});
Footprint.Theme.ellipsesLabelRenderDelegate = ellipsesLabelRenderDelegate;
Footprint.Theme.themes['source-list'].ellipsesLabelRenderDelegate = ellipsesLabelRenderDelegate;
