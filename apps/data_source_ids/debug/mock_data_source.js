// ==========================================================================
// Project:   DataSourceIds.MockDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals DataSourceIds */

/** @class

  @extends SC.FixturesDataSource
  @version 0.1
*/
DataSourceIds.MockDataSource = SC.FixturesDataSource.extend(
/** @scope DataSourceIds.MockDataSource.prototype */ {

  // turn on simulateRemoteResponse
  simulateRemoteResponse: YES,
  
  createRecords: function(store, storeKeys, params) {
    console.log("called createRecords");
    sc_super();
  },
      // override so an initial id can be passed in and then the fixture source creates
  // a "proper" one when the records are actually created
  _createRecords: function(store, storeKeys) {
    console.log('calling _createRecord');
    storeKeys.forEach(function(storeKey) {
      var id         = store.idFor(storeKey),
          recordType = store.recordTypeFor(storeKey),
          dataHash   = store.readDataHash(storeKey), 
          fixtures   = this.fixturesFor(recordType);

      var proper_id = this.generateIdFor(recordType, dataHash, store, storeKey);
      this._invalidateCachesFor(recordType, storeKey, proper_id);
      fixtures[proper_id] = dataHash;

      store.dataSourceDidComplete(storeKey, null, proper_id);
    }, this);
  },
  
  // Wrap the invokeLater since it uses SC.Timer which requires having a currentRunLoop
  invokeLater: function (methodName, interval) {
    SC.RunLoop.begin();
    sc_super();
    SC.RunLoop.end();
  }

}) ;