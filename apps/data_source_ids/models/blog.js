// ==========================================================================
// Project:   DataSourceIds.Blog
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals DataSourceIds */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
DataSourceIds.Blog = SC.Record.extend(
/** @scope DataSourceIds.Blog.prototype */ {
  title: SC.Record.attr(String),
  posts: SC.Record.toMany('DataSourceIds.Post',{
    inverse: 'blog'
  })
  // TODO: Add your own code here.

}) ;
