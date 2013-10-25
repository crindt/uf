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



Footprint.PresentationsController = SC.ArrayController.extend({
});

/***
 * Base class to manage the presentations of a particular type (e.g. maps or results) of matching particular key set in the instantiations
 * @type {*}
 */
Footprint.PresentationController = SC.ObjectController.extend({

    // Set the key to the particular presentation of interest
    key: null,

    presentations:null,
    presentationsStatus:null,
    presentationsStatusBinding:SC.Binding.oneWay('*presentations.status'),

    /**
     * Represents the presentation of the bound configEntity that matches the bound key
     */
    // This would work if the presentationStatus READY_CLEAN didn't preceed the items being READY_CLEAN
    content: function() {
        if (this.get('presentations') && (this.getPath('presentationsStatus') & SC.Record.READY)) {
            return this.get('presentations').filter(function(presentation, i) {
                return presentation.get('key') == this.get('key');
            }, this)[0];
        }
    }.property('presentations', 'presentationsStatus', 'key').cacheable(),

    keys: null,
    keysBinding:SC.Binding.oneWay('*content.presentation_media').transform(function(value) {
        if (value)
            return value.mapProperty('db_entity_interest').mapProperty('db_entity').mapProperty('key');
    })

    //SC.Binding.transform(function(value, isForward) {
    //    return value && $.unique(value.flatMapPropertyPath('db_entity.key'));
    //}).oneWay('Footprint.dbEntityInterestsController.content')
});

/***
 * Base class to controller the PresentationMedium instances of a particular presentation
 * You must set the presentationBinding to bind to a particular presentation
 * @type {*}
 */
Footprint.PresentationMediaController = SC.ArrayController.extend(SC.SelectionSupport, {

    orderBy: ['sortPriority DESC', 'name ASC'],

    /**
     * The owning Presentation of the PresentationMedium instances
     */
    presentation:null,
    contentBinding:SC.Binding.notEmpty('*presentation.presentation_media', []),

    /**
     * The Presentation's ConfigEntity
     */
    configEntity: null,
    configEntityBinding: '*presentation.config_entity',

    db_entity_interests: function() {
        if (this.get('content') && this.get('status') & SC.Record.READY) {
            return this.get('content').mapProperty('db_entity_interest');
        }
    }.property('content', 'status').cacheable(),

    tables: function() {
        if (this.get('content') && this.get('status') & SC.Record.READY) {
            return this.get('content').mapProperty('db_entity_interest.db_entity.table');
        }
    }.property('content', 'status').cacheable(),

    /**
     * Groups the db_entity_interests into an SC.Object keyed by unique db_entity key, each valued by an array of one or more DbEntity instances
     */
    dbEntityInterestsByKey: function() {
        if (this.get('db_entity_interests'))
            return $.mapToCollectionsObject(
                this.get('db_entity_interests').toArray(),
                function(db_entity_interest) {
                    return db_entity_interest.getPath('db_entity.key');
                },
                function(db_entity_interest) { return db_entity_interest;},
                function() { return SC.Object.create({
                        toString: function() {
                            return "DbEntityInterestsByKey";
                        }
                    });
                })
    }.property('db_entity_interests').cacheable(),

    selectedDbEntityInterestsByKey: function() {
        if (this.get('configEntity'))
            return this.getPath('configEntity.selections.db_entity_interests');
    }.property('configEntity'),

    /**
     * Keeps track of the PresentationMedium instances that are soloing.
     */
    _solos:[],

    /**
     * Sets the items that are soloing and disables the solos of all other items. This does not change the visible property of other items. It's up to the presenter of the items (e.g. the MapView to use isVisible to see if items are hidden due to their own state or because and item is soloing.
     */
    solos: function(propKey, value) {
        if (value===undefined) {
            return this.get('_solos');
        }
        else {
            this.get('content').forEach(function(presentationMedium) {
                // Disable the solo state of all other items by reverting visibility to the visible value
                if (!value.contains(presentationMedium)) {
                    presentationMedium.set('visibility', presentationMedium.get('visible'))
                }
            }, this);
            this.set('_solos', value);
        }
    }.property('content'),

    /***
     * Returns the visibility state of the presentationMedium, depending on if any items are soloing. If the given instance is soloing or no items are soloing and the given instance is not hidden, the function returns YES
     * @param presentationMedium
     * @returns {*|boolean}
     */
    isVisible: function(presentationMedium) {
        return this.get('solos').contains(presentationMedium) || (this.get('solos').length == 0 && presentationMedium.get('visibility')==Footprint.VISIBLE);
    },

    // TODO dbEntityInterestsByKey isn't dumping
    toString: function() {
        return "%@:\n%@".fmt(sc_super(), this.toStringAttributes('configEntity presentation content db_entity_interests  selectedDbEntityInterestsByKey'.w()));
    }
});

/***
 * Aggregates content from the subclasses of the controllers defined above. Assign this to a the content of a
 * LibraryController subclass and use that LibraryController for library views
 * @type {*}
 */
Footprint.LibraryContent = SC.Object.extend({
    init: function() {
        sc_super();
        this.bind('*presentationController.presentation', '.presentation');
        this.bind('*presentationController.keys', '.keys');
        this.bind('*presentationMediaController.content', '.items');
        this.bind('*presentationMediaController.dbEntityInterestsByKey', '.dbEntityInterestsByKey');
        this.bind('*presentationMediaController.selectedDbEntityInterestsByKey', '.selectedDbEntityInterestsByKey');
    },

    // A Footprint.PresentationController instance that binds a Presentation
    presentationController:null,
    // A Footprint.PresentationMediaController instance that binds the Presentation's PresentationMedium instances
    presentationMediaController:null,

    // The active ConfigEntity
    configEntity:null,
    // Bound on init to the presentationController.presentation
    presentation:null,

    /***
     * All the PresentationMedium instances of the Presentation
     */
    items:null,

    /***
     * Bound on init to the presentationMediaController.dbEntityInterestsByKey. This is an SC.Object with attributes
     * that are the keys of the DbEntityInterests with array values that are the matching DbEntityInterests
     */
    dbEntityInterestsByKey: null,
    /***
     * Bound on init to the presentationMediaController.selectedDbEntityInterestsByKey. This is an SC.Object with
     * attributes that are the keys of the DbEntityInterests with a single DbEntityInterest for a value that represents
     * the one or only DbEntityInterest with that key that is marked selected
     */
    selectedDbEntityInterestsByKey: null,
    /***
     * All of the keys assigned to all the DbEntityInterests
     */
    keys:null,

    tables:null,
    /***
     * This is bound to the active Scenario. In the future it should be bound to the more general active ConfigEntity
     */
    configEntityBinding: SC.Binding.oneWay('Footprint.scenarioActiveController.content').single()
});

/***
 * Base class to extend to bind to a currently active PresentationMedium of a Presentation.
 * You must bind content to the list of PresentationMedium instances when subclassing.
 * @type {*}
 */
Footprint.PresentationMediumActiveController = Footprint.ActiveController.extend({
});

/***
 * Used for buffered editing of a PresentationMedium
 * You must set objectControllerBinding to the PresentationMediumActiveController whose presentationMedium is to be edited
 * @type {*}
 */
Footprint.PresentationMediumEditController = SC.ObjectController.extend({

    // Used to create new instances
    recordType: Footprint.PresentationMedium
});

Footprint.MediaController = SC.ArrayController.extend(Footprint.ArrayContentSupport, {
});


