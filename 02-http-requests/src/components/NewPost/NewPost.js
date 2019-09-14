import React, { Component } from 'react';

import './NewPost.css';

class NewPost extends Component {

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text"/>
        <label>Content</label>
        <textarea rows="4"/>
        <label>Author</label>
        <select>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
