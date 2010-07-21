// ==========================================================================
// Project:   DataSourceIds.Post Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals DataSourceIds module test ok equals same stop start statusEquals afterStatusChange testAfterPropertyChange*/

// Note this is wrapped by SC in an anon function so it is safe to define 
// variables like this.
var store;

module("DataSourceIds.Post", {
  setup: function() {
    // reset fixtures
    DataSourceIds.Blog.FIXTURES = [
      { guid: 1,
        title: 'First Blog'}
    ];
    
    store = SC.Store.create().from('DataSourceIds.MockDataSource');    
  }
});

test("create a new post", function() {
  var post = store.createRecord(DataSourceIds.Post, {
    title: "A new post"
  });
  equals(post.get('title'), 'A new post', "Post object created with correct title");
});

test("new post id changes", function() {
  var post = store.createRecord(DataSourceIds.Post, {
    guid: "local_id_1",
    title: "A new post"
  });

  // force a commit to make sure the datasource createRecords method is called
  // need to do the commit in a run loop so the fixtures latency code works properly
  SC.run(function(){
    store.commitRecords();    
  });
  equals(post.get('id'), "local_id_1", "Post object starts out with local id");
  statusEquals(post, SC.Record.BUSY_CREATING, 
    'post should be in BUSY_CREATING state immediately after createRecord');
  
  afterStatusChange(post, function () {
    statusEquals(post, SC.Record.READY_CLEAN, 'post should transition to READY_CLEAN');
    ok(post.get('id') !== "local_id_1", 
      "post should no longer have local id (it has " + post.get('id') + ")");
  });
});