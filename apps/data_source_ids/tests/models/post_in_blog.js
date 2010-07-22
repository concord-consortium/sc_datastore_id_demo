// ==========================================================================
// Project:   DataSourceIds.Post Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals DataSourceIds module test ok equals same stop start statusEquals afterStatusChange testAfterPropertyChange*/

// You can run this test directly by going to:
// http://localhost:4020/data_source_ids/en/current/tests/models/post_in_blog.html

// Note this is wrapped by SC in an anon function so it is safe to define 
// variables like this.
var store;

module("DataSourceIds.Post", {
  setup: function() {
    
    // reset fixtures for each test
    DataSourceIds.Blog.FIXTURES = [
      { guid: 1,
        title: 'First Blog'}
    ];
    
    store = SC.Store.create().from('DataSourceIds.MockDataSource');    
  }
});

// Basic example of the issue
test("creating a new post in a blog requires fixing references", function() {
  var blog = store.find(DataSourceIds.Blog, 1);

  // wait until blog is ready before using it
  afterStatusChange(blog, function(){
    var post = store.createRecord(DataSourceIds.Post, {
      guid: "local_id_1",
      title: "A new post"
    });
    post.set('blog', blog);
    
    store.commitRecords();    
    afterStatusChange(post, function () {
      ok(post.get('id') !== "local_id_1", "created post record no longer has a local id");

      var blogPost = blog.get('posts').objectAt(0);
      equals(blogPost.get('id'), 'local_id_1', "blog's post still has original id");      
      ok(blogPost.get('isError'), "blog's post is actually an error: " + blogPost.get('errorObject'));
    });
  });  
});