(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/app.js":[function(require,module,exports){
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var CommentBox = require('./components/commentBox');

ReactDOM.render(
  React.createElement(CommentBox, {url: "/api/comments", pollInterval: 2000}),
  document.getElementById('content')
);

},{"./components/commentBox":"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentBox.js"}],"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/comment.js":[function(require,module,exports){
var Comment = React.createClass({displayName: "Comment",
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})
      )
    );
  }
});

module.exports = Comment;

},{}],"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentBox.js":[function(require,module,exports){
var CommentList = require('./commentList');
var CommentForm = require('./commentForm');

var CommentBox = React.createClass({displayName: "CommentBox",
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

module.exports = CommentBox;

},{"./commentForm":"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentForm.js","./commentList":"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentList.js"}],"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentForm.js":[function(require,module,exports){
var CommentForm = React.createClass({displayName: "CommentForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function() {
    return (
      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

module.exports = CommentForm;

},{}],"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/commentList.js":[function(require,module,exports){

var Comment = require('./comment');

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        React.createElement(Comment, {author: comment.author, key: index}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

module.exports = CommentList;

},{"./comment":"/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/components/comment.js"}]},{},["/Users/housemex408/Documents/Git-Projects/comments_box/react-tutorial/public/scripts/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG91c2VtZXg0MDgvRG9jdW1lbnRzL0dpdC1Qcm9qZWN0cy9jb21tZW50c19ib3gvcmVhY3QtdHV0b3JpYWwvcHVibGljL3NjcmlwdHMvYXBwLmpzIiwiL1VzZXJzL2hvdXNlbWV4NDA4L0RvY3VtZW50cy9HaXQtUHJvamVjdHMvY29tbWVudHNfYm94L3JlYWN0LXR1dG9yaWFsL3B1YmxpYy9zY3JpcHRzL2NvbXBvbmVudHMvY29tbWVudC5qcyIsIi9Vc2Vycy9ob3VzZW1leDQwOC9Eb2N1bWVudHMvR2l0LVByb2plY3RzL2NvbW1lbnRzX2JveC9yZWFjdC10dXRvcmlhbC9wdWJsaWMvc2NyaXB0cy9jb21wb25lbnRzL2NvbW1lbnRCb3guanMiLCIvVXNlcnMvaG91c2VtZXg0MDgvRG9jdW1lbnRzL0dpdC1Qcm9qZWN0cy9jb21tZW50c19ib3gvcmVhY3QtdHV0b3JpYWwvcHVibGljL3NjcmlwdHMvY29tcG9uZW50cy9jb21tZW50Rm9ybS5qcyIsIi9Vc2Vycy9ob3VzZW1leDQwOC9Eb2N1bWVudHMvR2l0LVByb2plY3RzL2NvbW1lbnRzX2JveC9yZWFjdC10dXRvcmlhbC9wdWJsaWMvc2NyaXB0cy9jb21wb25lbnRzL2NvbW1lbnRMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRXBELFFBQVEsQ0FBQyxNQUFNO0VBQ2Isb0JBQUMsVUFBVSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxlQUFBLEVBQWUsQ0FBQyxZQUFBLEVBQVksQ0FBRSxJQUFLLENBQUEsQ0FBRyxDQUFBO0VBQ3RELFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ25DLENBQUM7OztBQ2pCRixJQUFJLDZCQUE2Qix1QkFBQTtFQUMvQixTQUFTLEVBQUUsV0FBVztJQUNwQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQ2pDLEdBQUc7O0VBRUQsTUFBTSxFQUFFLFdBQVc7SUFDakI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQVUsQ0FBQSxFQUFBO1FBQ3ZCLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZUFBZ0IsQ0FBQSxFQUFBO1VBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTztRQUNoQixDQUFBLEVBQUE7UUFDTCxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLHVCQUFBLEVBQXVCLENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRyxDQUFBLENBQUcsQ0FBQTtNQUMvQyxDQUFBO01BQ047R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7QUNsQnpCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTNDLElBQUksZ0NBQWdDLDBCQUFBO0VBQ2xDLHNCQUFzQixFQUFFLFdBQVc7SUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7TUFDbkIsUUFBUSxFQUFFLE1BQU07TUFDaEIsS0FBSyxFQUFFLEtBQUs7TUFDWixPQUFPLEVBQUUsU0FBUyxJQUFJLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO09BQzdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztNQUNaLEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3ZELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztHQUNKO0VBQ0QsbUJBQW1CLEVBQUUsU0FBUyxPQUFPLEVBQUU7SUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDL0IsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO01BQ25CLFFBQVEsRUFBRSxNQUFNO01BQ2hCLElBQUksRUFBRSxNQUFNO01BQ1osSUFBSSxFQUFFLE9BQU87TUFDYixPQUFPLEVBQUUsU0FBUyxJQUFJLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO09BQzdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztNQUNaLEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3ZELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztHQUNKO0VBQ0QsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztHQUNuQjtFQUNELGlCQUFpQixFQUFFLFdBQVc7SUFDNUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0dBQ25FO0VBQ0QsTUFBTSxFQUFFLFdBQVc7SUFDakI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxFQUFBO1FBQzFCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsVUFBYSxDQUFBLEVBQUE7UUFDakIsb0JBQUMsV0FBVyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQSxDQUFHLENBQUEsRUFBQTtRQUN0QyxvQkFBQyxXQUFXLEVBQUEsQ0FBQSxDQUFDLGVBQUEsRUFBZSxDQUFFLElBQUksQ0FBQyxtQkFBb0IsQ0FBQSxDQUFHLENBQUE7TUFDdEQsQ0FBQTtNQUNOO0dBQ0g7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQzs7O0FDcEQ1QixJQUFJLGlDQUFpQywyQkFBQTtFQUNuQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDeEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtNQUNwQixPQUFPO0tBQ1I7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0dBQzNCO0VBQ0QsTUFBTSxFQUFFLFdBQVc7SUFDakI7TUFDRSxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQUEsRUFBYSxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxZQUFjLENBQUEsRUFBQTtRQUN6RCxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLE1BQUEsRUFBTSxDQUFDLFdBQUEsRUFBVyxDQUFDLFdBQUEsRUFBVyxDQUFDLEdBQUEsRUFBRyxDQUFDLFFBQVEsQ0FBQSxDQUFHLENBQUEsRUFBQTtRQUMxRCxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLE1BQUEsRUFBTSxDQUFDLFdBQUEsRUFBVyxDQUFDLGtCQUFBLEVBQWtCLENBQUMsR0FBQSxFQUFHLENBQUMsTUFBTSxDQUFBLENBQUcsQ0FBQSxFQUFBO1FBQy9ELG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsUUFBQSxFQUFRLENBQUMsS0FBQSxFQUFLLENBQUMsTUFBTSxDQUFBLENBQUcsQ0FBQTtNQUMvQixDQUFBO01BQ1A7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOzs7QUN2QjdCO0FBQ0EsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVuQyxJQUFJLGlDQUFpQywyQkFBQTtFQUNuQyxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3BFLE1BQU07QUFDTjtBQUNBOztRQUVRLG9CQUFDLE9BQU8sRUFBQSxDQUFBLENBQUMsTUFBQSxFQUFNLENBQUUsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUEsRUFBRyxDQUFFLEtBQU8sQ0FBQSxFQUFBO1VBQzFDLE9BQU8sQ0FBQyxJQUFLO1FBQ04sQ0FBQTtRQUNWO0tBQ0gsQ0FBQyxDQUFDO0lBQ0g7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO1FBQzFCLFlBQWE7TUFDVixDQUFBO01BQ047R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogVGhpcyBmaWxlIHByb3ZpZGVkIGJ5IEZhY2Vib29rIGlzIGZvciBub24tY29tbWVyY2lhbCB0ZXN0aW5nIGFuZCBldmFsdWF0aW9uXG4gKiBwdXJwb3NlcyBvbmx5LiBGYWNlYm9vayByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZC5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMXG4gKiBGQUNFQk9PSyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbiAqIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbiAqIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBDb21tZW50Qm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1lbnRCb3gnKTtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8Q29tbWVudEJveCB1cmw9XCIvYXBpL2NvbW1lbnRzXCIgcG9sbEludGVydmFsPXsyMDAwfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTtcbiIsInZhciBDb21tZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByYXdNYXJrdXA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByYXdNYXJrdXAgPSBtYXJrZWQodGhpcy5wcm9wcy5jaGlsZHJlbi50b1N0cmluZygpLCB7c2FuaXRpemU6IHRydWV9KTtcbiAgICByZXR1cm4geyBfX2h0bWw6IHJhd01hcmt1cCB9O1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY29tbWVudEF1dGhvclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmF1dGhvcn1cbiAgICAgICAgPC9oMj5cbiAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKCl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21tZW50O1xuIiwidmFyIENvbW1lbnRMaXN0ID0gcmVxdWlyZSgnLi9jb21tZW50TGlzdCcpO1xudmFyIENvbW1lbnRGb3JtID0gcmVxdWlyZSgnLi9jb21tZW50Rm9ybScpO1xuXG52YXIgQ29tbWVudEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbG9hZENvbW1lbnRzRnJvbVNlcnZlcjogZnVuY3Rpb24oKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdGhpcy5wcm9wcy51cmwsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBkYXRhfSk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuICBoYW5kbGVDb21tZW50U3VibWl0OiBmdW5jdGlvbihjb21tZW50KSB7XG4gICAgdmFyIGNvbW1lbnRzID0gdGhpcy5zdGF0ZS5kYXRhO1xuICAgIHZhciBuZXdDb21tZW50cyA9IGNvbW1lbnRzLmNvbmNhdChbY29tbWVudF0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IG5ld0NvbW1lbnRzfSk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdGhpcy5wcm9wcy51cmwsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogY29tbWVudCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YX0pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge2RhdGE6IFtdfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubG9hZENvbW1lbnRzRnJvbVNlcnZlcigpO1xuICAgIHNldEludGVydmFsKHRoaXMubG9hZENvbW1lbnRzRnJvbVNlcnZlciwgdGhpcy5wcm9wcy5wb2xsSW50ZXJ2YWwpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRCb3hcIj5cbiAgICAgICAgPGgxPkNvbW1lbnRzPC9oMT5cbiAgICAgICAgPENvbW1lbnRMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgPENvbW1lbnRGb3JtIG9uQ29tbWVudFN1Ym1pdD17dGhpcy5oYW5kbGVDb21tZW50U3VibWl0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudEJveDtcbiIsInZhciBDb21tZW50Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBhdXRob3IgPSB0aGlzLnJlZnMuYXV0aG9yLnZhbHVlLnRyaW0oKTtcbiAgICB2YXIgdGV4dCA9IHRoaXMucmVmcy50ZXh0LnZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIXRleHQgfHwgIWF1dGhvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ29tbWVudFN1Ym1pdCh7YXV0aG9yOiBhdXRob3IsIHRleHQ6IHRleHR9KTtcbiAgICB0aGlzLnJlZnMuYXV0aG9yLnZhbHVlID0gJyc7XG4gICAgdGhpcy5yZWZzLnRleHQudmFsdWUgPSAnJztcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY29tbWVudEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZVwiIHJlZj1cImF1dGhvclwiIC8+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2F5IHNvbWV0aGluZy4uLlwiIHJlZj1cInRleHRcIiAvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiUG9zdFwiIC8+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudEZvcm07XG4iLCJcbnZhciBDb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50Jyk7XG5cbnZhciBDb21tZW50TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tbWVudE5vZGVzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbihjb21tZW50LCBpbmRleCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgLy8gYGtleWAgaXMgYSBSZWFjdC1zcGVjaWZpYyBjb25jZXB0IGFuZCBpcyBub3QgbWFuZGF0b3J5IGZvciB0aGVcbiAgICAgICAgLy8gcHVycG9zZSBvZiB0aGlzIHR1dG9yaWFsLiBpZiB5b3UncmUgY3VyaW91cywgc2VlIG1vcmUgaGVyZTpcbiAgICAgICAgLy8gaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL211bHRpcGxlLWNvbXBvbmVudHMuaHRtbCNkeW5hbWljLWNoaWxkcmVuXG4gICAgICAgIDxDb21tZW50IGF1dGhvcj17Y29tbWVudC5hdXRob3J9IGtleT17aW5kZXh9PlxuICAgICAgICAgIHtjb21tZW50LnRleHR9XG4gICAgICAgIDwvQ29tbWVudD5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudExpc3RcIj5cbiAgICAgICAge2NvbW1lbnROb2Rlc31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnRMaXN0O1xuIl19
