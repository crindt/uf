/* 
 * UrbanFootprint-California (v1.0), Land Use Scenario Development and Modeling System.
 * 
 * Copyright (C) 2012 Calthorpe Associates
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Contact: Joe DiStefano (joed@calthorpe.com), Calthorpe Associates. Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709. Phone: (510) 548-6800. Web: www.calthorpe.com
 */

sc_require('data_sources/server_api_caller');

Footprint.DataSource = SC.DataSource.extend({

    init: function() {
        this._storeKeysToRetrieve = [];
        this._storeForRetrieve = null;
        sc_super();
    },

    fetch: function(store, query, retry) {

        // Return local queries as handled without doing anything. We always assume that the data needed by a loca
        // query was already fetched by a remote query.
        if (!query.get('isRemote')) {
            store.dataSourceDidFetchQuery(query);
            return YES;
        }

        var recordType = query.recordType;

        // For some reason the generic SC.Record type is sometimes fetched. We obviously can't handle it here
        if (recordType == Footprint.Record) {
            logError("Received a Footprint.Record record type. This should never happen");
            return NO;
        }

        // If we are doing a set GET but have no ids, don't query
        if (query.parameters && query.parameters.ids && query.parameters.ids.length == 0) {
            logError("Received an ids parameters with no ids. This probably shouldn't happen.");
            store.dataSourceDidFetchQuery(query);
            return YES;
        }

        // Use the recordType and parameters to form the API call
        var apiCaller = this.recordTypeToApiCaller(recordType, query.parameters);
        if (apiCaller) {
            apiCaller.load(
                this,
                this._didFetch,
                { query: query, store: store, recordType: recordType, retry:YES }
            );
        }
        // For now if no handler exists, it means we have an internal Sproutcore record type
        return YES;
    },

    _didFetch: function(response, params) {
        var store = params.store;
        var query = params.query;
        var recordType = params.recordType;
        var storeKeys;
        // NOTE: If we get a response that's 200 OK but has a string response body, we're assuming
        // that it's this odd edge case where selecting too many parcels bombs out the server but
        // returns a 200.
        if (SC.$ok(response) && SC.typeOf(response.get('body')) === SC.T_HASH) {
            if (response.get('body')['objects']) {
                // If the API returned a list there will be an 'objects' property containing all the object
                var self = this;
                var objs = $.map(response.get('body')['objects'], function(obj) {
                    return self._transformTastypieJsonToSproutcore(obj, recordType);
                });
                storeKeys = store.loadRecords(recordType, objs);
            }
            else {
                // Otherwise return the single result as a list (loadRecord might work here instead)
                var obj = this._transformTastypieJsonToSproutcore(response.get('body'), recordType);
                storeKeys = [store.loadRecord(recordType, obj)];
            }
            store.loadQueryResults (query, storeKeys);
        }
        else {
            // handle special weird error case where nginx returns a 200 OK with an error message in
            // the body.
            if (SC.$ok(response) && SC.typeOf(response.get('body')) !== SC.T_HASH)
                store.dataSourceDidErrorQuery(query, response); //same as below for now - may require special handling later
            // handle error case where we want to retry
            // TODO: This needs to be smarter about infinite-loop retrying certain things (e.g. 500
            // server errors).
            else if (!params.retry)
                this.fetch(store, query, YES);
            // handle regular error case
            else
                store.dataSourceDidErrorQuery(query, response);
        }

        return YES
    },

    /***
     * Transform the Tastypie model object to a Sproutcore formatted one, which for now just means using an id for related items instead of a uri
     * @param obj
     * @param recordType: Optional recordType to inform transformation
     * @return {*}
     * @private
     */
    _transformTastypieJsonToSproutcore: function(obj, recordType) {
        return this._transform(this._deurlify, obj, null, null, recordType);
    },

    _transform: function(func, obj, parent, key, recordType) {
        var self = this;
        if (typeof obj === 'object') {
            if (obj instanceof Array) {
                return $.map(obj, function(value, i) {
                    return self._transform(func, value, parent, key, recordType);
                })
            }
            else {
                return obj &&
                    (recordType == Footprint.BuiltForm  ?
                        mapToSCObject(obj, function(value, key) {
                            return [key, self._transform(func, value, obj, key, recordType)];
                        }) :
                        $.mapToDictionary(obj, function(value, key) {
                            return [key, self._transform(func, value, obj, key, recordType)];
                        }));
            }
        }
        else {
            return func.apply(this, [obj, parent, key]);
        }
    },
    /**
     Transforms the association fields from Resource URI django-tastypie format to the Sproutcore related id format
     */
    _deurlify: function(value, parent, key) {
        if (typeof value === "string" && value.indexOf('/') === 0) {
            parent['_footprint_%@'.fmt(key)] = value;
            return this._convertUrlToId(value);
        }
        else
            return value;
    },
    _convertUrlToId: function(value) {
        return parseInt(value.split('/').reverse()[1]);
    },

    /***
     * Transform the Sproutcore model object to a Tastypie formatted one, which for now just means using a resource url for related items instead of an id
     * @param obj
     * @return {*}
     * @private
     */
    _transformSproutcoreJsonToTastypie: function(store, obj, originalObj, recordType) {
        var self = this;
        if (!obj) {
           return obj;
        }
        else if (typeof obj === 'object') {
            if (obj instanceof Array) {
                return obj.map(function(value) {
                    // Extract the attributes from the record if it is a record
                    var dataHash = value.storeKey ? store.readDataHash(value.storeKey) : value;
                    // Get the parent store data hash so that we only send values that have actually changed
                    var originalDataHash = store.parentStore && value && value.storeKey ?
                        this._processDataHash(store.parentStore.readDataHash(value.storeKey), data.recordType) :
                        null;
                    return self._transformSproutcoreJsonToTastypie(store, dataHash, originalDataHash, recordType)
                });
            }
            else {
                return obj && $.mapToDictionary(obj, function(value, key) {
                    // Change the 'resource_uri' property from an id to a uri. This probably doesn't matter to the API
                    if (key=='resource_uri') {
                        return [key, self._urlify(value, recordType)];
                    }
                    else {
                        // If we can detect that the primitive value has not changed, leave it out of the transformation
                        // This minimizes the data that is sent to the API in a PATCH operation.
                        // TODO we probably need to limit this to PATCHES. POST and PUT probably won't like missing values
                        if (value && !value.storeKey && originalObj && value===originalObj[key])
                            return null;

                        // Extract the attributes from the record if it is a record
                        var data = value && value.storeKey ? store.readDataHash(value.storeKey) : value;
                        // Get the parent store data hash so that we only send values that have actually changed
                        var originalData = store.parentStore && value && value.storeKey ?
                            this._processDataHash(store.parentStore.readDataHash(value.storeKey), data.recordType) :
                            null;
                        var childRecordType = self._modelClassOfAttribute(recordType, key);
                        return [key, self._transformSproutcoreJsonToTastypie(store, data, originalData, childRecordType)];
                    }
                });
            }
        }
        else {
            // Change the id to a resource uri if a recordType is defined
            return this._urlify(obj, recordType);
        }
    },

    /**
     * Returns the child record type for the RecordAttribute that the key represents, if any
     * @param recordType - the recordType that owns the key. If this is null the function returns null
     * @param key - the key of the recordType
     * @returns {*} The record type of the attribute or null
     * @private
     */
    _modelClassOfAttribute: function(recordType, key) {
        if (recordType) {
            var attribute = recordType.prototype[key];
            if (attribute &&
                attribute.kindOf &&
                attribute.kindOf(SC.RecordAttribute)) {

                return (typeof attribute.type == 'string' || attribute.type.kindOf) ? eval(attribute.type) : null;
            }
            else if (recordType.prototype.resolveAttributeType) {
                return recordType.prototype.resolveAttributeType(key)
            }
        }
        else
            return null;
    },

    /**
     Transforms the association fields from and id to Resource URI django-tastypie format
     */
    _urlify: function(value, recordType) {
        if (recordType) {
            // Detect negative ids, indicating a new record and transform to 0 for tastypie
            return "/footprint/api/v1/%@/%@/".fmt(this.toApiResourceName(recordType), value < 0 ? 0 : value);
        }
        else
            return value;
    },

    /**
     * Since SC.Store calls once on each storeKey, we accumulate and then invoke once at the end of the run loop
     * @param store
     * @param storeKeys
     */
    retrieveRecords: function(store, storeKeys) {

        var recordTypes = storeKeys.map(function(storeKey) {
            return SC.Store.recordTypeFor(storeKey);
        });

        // Never load ConfigEntities with retrieveRecords.
        // It causes a problem when a Feature is being fetched that has a config_entity_id
        // because the store tries to fetch the ConfigEntity while something else is busy_loading
        if (recordTypes.contains(Footprint.ConfigEntity))
            return NO;

        storeKeys.forEach(function(storeKey) {
            this._storeKeysToRetrieve.push(storeKey);
        }, this);
        // We assume this is always the same store
        this._storeForRetrieve = store;
        this.invokeOnce('_retrieveRecords');
        return YES;
    },

    _retrieveRecords: function() {
        var storeKeys = this._storeKeysToRetrieve;
        var store = this._storeForRetrieve;

        // convert storeKeys into id’s sorted by recordType.
        var recordTypes = SC.Set.create(),  // to store record types.
            sortedIds  = {},
            ret=null ; // return value

        storeKeys.forEach(function(storeKey) {
            var recordType = SC.Store.recordTypeFor(storeKey);
            recordTypes.add(recordType);

            var typeGuid = SC.guidFor(recordType);
            var ids = sortedIds[typeGuid];
            if (!ids) ids = sortedIds[typeGuid] = [];

            // map storeKey to ID
            var id = store.idFor(storeKey);
            ids.push(id);

        }, this);

        // now for each recordType, initiate a request
        recordTypes.forEach(function(recordType) {
            var local_ret = this.retrieveRecordsOfType(store, recordType, sortedIds, ret);
            // Set SC.MIXED_STATE if we get different YES/NO across types
            ret = (ret === NO && local_ret) ? SC.MIXED_STATE : (ret === null ? local_ret : ret);
        }, this);
        this._storeKeysToRetrieve = [];

        return ret;
    },

    retrieveRecordsOfType: function(store, recordType, sortedIds, retry) {
        var ids = sortedIds[SC.guidFor(recordType)];
        if (ids.length > 0) {
            var apiCaller = this.recordTypeToApiCaller(recordType, {ids: ids});
            // if apiCaller was found - initiate request
            if (apiCaller) {
                apiCaller.load(
                    this,
                    this._didRetrieveRecords,
                    { store: store, recordType: recordType, sortedIds: sortedIds, retry:retry });
                return YES;
            }
        }
    },

    // Called when a group of records have returns. assume result is array of data hashes
    // Also used for updates and creates that need to update the record/s that was/were saved
    _didRetrieveRecords: function(response, params) {
        var store = params.store,
            recordType = params.recordType;

        // normal: load into store...response == dataHash
        if (SC.$ok(response)) {
            if (!response.get('body')['objects']) {
                logError('Response body has no objects!');
            }
            else {
                // If the API returned a list there will be an 'objects' property containing all the object
                var self = this;
                var objs = $.map(response.get('body')['objects'], function(obj) {
                    // TODO this shouldn't be needed anymore, just make features a non nested property
                    return self._transformTastypieJsonToSproutcore(obj, recordType);
                });
                if (params.create)
                    params.storeKeys.forEach(function(storeKey, i) {
                        var object = objs[i];
                        params.store.dataSourceDidComplete(storeKey, object, object.id);
                    });
                else
                    store.loadRecords(recordType, objs || [], objs.mapProperty('id'));
            }
            // error: indicate as such...response == error
            //TODO storeKey expected but this ran on multiple storeKeys
        } else {
            //store.dataSourceDidError(storeKey, response.get('body'));
            if (!params.retry) {
                logWarning('DataSource did error for recordType: %@. Response: %@. Retrying'.fmt(recordType, response.get('body')));
                this.retrieveRecordsOfType(store, recordType, params.sortedIds, YES);
            }
            else
                logError('DataSource did error for recordType: %@. Response: %@'.fmt(recordType, response.get('body')));

        }
    },

    /***
     * Creates a new record.
     * @param store
     * @param storeKey
     * @returns {*}
     */
    createRecord: function(store, storeKey) {

        var recordType = store.recordTypeFor(storeKey);

        if (recordType==Footprint.User) {
            // We don't allow creating users at the moment, and we don't want create to trigger an API call
            store.dataSourceDidComplete(storeKey, null, store.idFor(storeKey));
            return YES
        }

        // Hack for Scenario type
        if (recordType==Footprint.Scenario) {
            var scenario = store.materializeRecord(storeKey)
            recordType = scenario.getPath('categories.firstObject.value') == 'Future' ? Footprint.FutureScenario : Footprint.BaseScenario;
        }

        var apiCaller = this.recordTypeToApiCaller(recordType);
        if (apiCaller) {
            // Create is always performed as a PATCH, so convert this to a multi-object request with storeKeys
            apiCaller.create(
                this,
                this._didCreate,
                { store: store, storeKeys: [storeKey], recordType: recordType }
            );
        }

        return YES;
    },


    updateRecords: function(store, storeKeys) {

        var recordType = store.recordTypeFor(storeKeys[0]);

        var apiCaller = this.recordTypeToApiCaller(recordType, {config_entity:Footprint.scenarioActiveController.get('content')}, 'PATCH');
        storeKeys.forEach(function(storeKey) {
            var status = store.readStatus(storeKey);
            if (!(status & SC.Record.BUSY)) {
                logError("About to update %@ record that is not BUSY! storeKey: %@, status %@".fmt(recordType, storeKey, getStatusString(status)));
            }
            else {
                logInfo("About to update %@ record with storeKey: %@, status %@".fmt(recordType, storeKey, getStatusString(status)));
            }
        });
        apiCaller.update(
            this,
            this._didUpdate,
            { store: store, storeKeys: storeKeys, recordType: recordType }
        );

        return YES;
    },
    updateRecord: function(store, storeKey) {
        var recordType = store.recordTypeFor(storeKey);

        var apiCaller = this.recordTypeToApiCaller(recordType, {id:store.idFor(storeKey), config_entity:Footprint.scenarioActiveController.get('content')}, 'PATCH');
        apiCaller.update(
            this,
            this._didUpdate,
            { store: store, storeKey: storeKey, recordType: recordType }
        );

        return YES;
    },


    /***
     * Called upon completing the API call to create the record.
     * @param response
     * @param store
     * @param storeKey
     * @private
     */
    _didCreate: function(response, params) {
        this._didSave(response, params, YES);
    },

    _didUpdate: function(response, params) {
        this._didSave(response, params, NO);
    },

    _didSave: function(response, params, create) {
        if (SC.ok(response)) {
            // Check if the store is destroyed by a subsequent update. If so do nothing return YES.
            if (params.store.get('isDestroyed'))
                return YES;

            // Single update cases
            if (params.storeKey) {
                var status = params.store.readStatus(storeKey);

                // Some temporary state error handling
                if (!(status & SC.Record.BUSY)) {
                    logError("After save %@ record is not BUSY! This should never happen. storeKey: %@, status: %@".fmt(params.recordType, params.storeKey, getStatusString(status)));
                }
                else
                    if (create)
                        params.store.dataSourceDidComplete(params.storeKey, response.get('body'), response.getPath('body.id'));
                    else
                        params.store.dataSourceDidComplete(params.storeKey);
            }
            // Multiple save cases
            else {
                // Save that returned a response
                if (response.get('body')['objects'])
                    // Handle Record types that need to return the records upon saving
                    this._didRetrieveRecords(response, $.extend({}, params, {create:create}));
                // Update without a response
                else {
                    params.storeKeys.forEach(function(storeKey) {
                        params.store.dataSourceDidComplete(storeKey);
                    });
                }
            }
        } else {
            if (params.storeKey) {
                params.store.dataSourceDidError(params.storeKey);
            }
            else {
                params.storeKeys.forEach(function(storeKey) {
                    params.store.dataSourceDidError(storeKey, response.get('errorObject'));
                });
            }
        }
    },

    destroyRecord: function(store, storeKey) {
        if (SC.kindOf(store.recordTypeFor(storeKey), Todos.Task)) {
            SC.Request.deleteUrl(store.idFor(storeKey)).header({
                'Accept': 'application/json'
            }).json()
                .notify(this, this.didDestroyTask, store, storeKey)
                .send();
            return YES;

        } else return NO;
    },
    didDestroyTask: function(response, store, storeKey) {
        if (SC.ok(response)) {
            store.dataSourceDidDestroy(storeKey);
        } else store.dataSourceDidError(response);
    },

    /***
     * Resolves the API name of the record based on its type. Record classes can override apiClassName to provide
     * a custom name, otherwise the name will be inferred by the class name
     * @param recordType
     * @returns {*}
     */
    toApiResourceName: function(recordType) {
        // Some record types have this attribute so that they send a base class name to the server
        var useRecordTypeName = recordType.apiClassName() || recordType.toString().split('.')[1].decamelize();
        return useRecordTypeName;
    },

    /***
     * Constructs a relative URI for proxying to the Django server
     * TODO set up a non-proxy option for the production environment
     * @param apiModelName
     * @param id
     * @return {*}
     * @private
     */
    _constructUri : function(apiModelName, options) {
        // Append the id as 'id/' or ids in the form: 'set/id1;id2;....' or nothing
        var idSegment = options['id'] ? '%@/'.fmt(options['id']) : (options['ids'] ? 'set/%@/'.fmt(options['ids'].join(';')): '');
        return '/%@/api/v1/%@/%@'.fmt(this._resolveProxy(), apiModelName, idSegment);
    },
    /***
     * Use a proxy in development mode to avoid cross domain request errors. We proxy localhost:4020/fp to localhost/footprint
     * @private
     */
    _resolveProxy: function() {
        return Footprint.isDevelopment ? 'fp' : 'footprint';
    },

    authenticationApiCaller: function(username, password) {
        // TODO this just uses a Django view instead of the api
        uri = '/fp/api_authentication';
        var uriOptions = {format:'json', username:username, password:password};
        return this.createCallerForUri(uri, uriOptions);
    },


    /***
     * Creates an ApiCaller instance for the record type and the given options.
     * @param recordType
     * @param parameters: The options are usually based on the Sproutcore query parameters, but the api call
     * @param method: Optional: 'PATCH', 'GET', etc
     * is only interested in certain parameters, which sometimes depend on the recordType
     */
    recordTypeToApiCaller: function(recordType, parameters, method) {
        parameters = parameters || {};
        var apiModelName = this.toApiResourceName(recordType);
        //var options = {csrf_token:'{{ csrf_token }}'};
        var uriPath,
            uriOptions,
        // The id to append to the url for single record queries
            id = parameters && parameters.id && parameters['id'],
            ids = parameters && parameters.ids && parameters['ids'];

        // All other Tastypie calls
        uriPath = this._constructUri(apiModelName, {id:id, ids:ids});
        uriOptions = $.extend(
            {},
            {format:'json', limit:1000},
            Footprint.userController.get('status') & SC.Record.READY ? {
                api_key:Footprint.userController.getPath('content.firstObject.api_key'),
                username:Footprint.userController.getPath('content.firstObject.username') }
            : {},
            // Add the optinos.
            this._contextParameters(recordType, parameters, method)
        );

        return this.createCallerForUri(uriPath, uriOptions);
    },

    /***
     * Adds contextual parameters to resolve dynamic subclasses on the server
     * @param recordType
     * @param parameters
     * @private
     */
    _contextParameters: function(recordType, parameters, method) {
        var modified_parameters = {};
        if (parameters.layer) {
            // Convert any reference to a Footprint.Layer to a layer__id parameter
            modified_parameters['layer__id'] = parameters.layer.get('id');
        }
        else if (method=='PATCH' && recordType==Footprint.LayerSelection) {
            // LayerSelection PATCH. Hacky, but we the API needs at the moment to resolve the LayerSelection class
            modified_parameters['layer__id'] = Footprint.layerSelectionActiveController.getPath('layer.id');
        }

        if (parameters.config_entity || parameters.parent_config_entity) {
            // Many recordTypes, including Feature subclasses, belong to a ConfigEntity instance. Pass it to the API
            // to filter the results.
            $.extend(
                modified_parameters,
                parameters.config_entity ?
                    {config_entity__id:parameters.config_entity.get('id')} :
                    {parent_config_entity__id:parameters.parent_config_entity.get('id')}
            );
        }

        if (parameters.layer_selection) {
            // If a layer_selection parameter is passed, send both its id and the layer id, since layer_selection
            // classes are specific to layers
            modified_parameters['layer_selection__id'] = parameters.layer_selection.get('id');
            modified_parameters['layer__id'] = parameters.layer_selection.getPath('layer.id');
        }

        return Object.keys(modified_parameters).length > 0 ?
            modified_parameters :
            parameters;
    },

    // TODO make this into something that's easy to cache
    createCallerForUri: function(uriPath, uriOptions) {

        var uri = '%@?%@'.fmt(
            uriPath,
            $.map(
                uriOptions,
                function(value, key) {
                    return '%@=%@'.fmt(key, value);
                }
            ).join('&'));

        return Footprint.ServerApiCaller.create({
            uri: uri
        });
    }
});