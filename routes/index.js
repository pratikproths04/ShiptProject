
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('getCategories', { title: 'Shipt Project' });
};