//var React = require('react-addons');
var _ = require('lodash');
module.exports = function() {
  return React.createElement('div', {
    'className': 'comment'
  }, React.createElement('h2', {
    'className': 'commentAuthor'
  }, '\n    ', this.props.author, '\n  '), React.createElement('span', {
    'dangerouslySetInnerHTML': this.rawMarkup()
  }));
};
