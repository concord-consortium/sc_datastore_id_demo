// ==========================================================================
// Project:   DataSourceIds.Post
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals DataSourceIds */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
DataSourceIds.Post = SC.Record.extend(
/** @scope DataSourceIds.Post.prototype */ {

  title: SC.Record.attr(String),
  blog: SC.Record.toOne('DataSourceIds.Blog',{
    inverse: 'posts'
  })

}) ;
