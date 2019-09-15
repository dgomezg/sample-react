import React, { Component } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import './Blog.css';


class Blog extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                    to="/" 
                    exact
                    // activeClassName="my-custom-active-classname"
                    // activeStyle={{
                    //   color: '#fa923f',
                    //   textDecoration: 'underline'
                    // }}
                    >Home</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                // hash: '#submit',
                // search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <Posts/>}/> 
        <Route path="/" render={() => <p>This will be shown always as it does not have th 'exact'</p>}/>*/}
        <Route path="/" exact component={Posts}/>
        <Switch>
          <Route path="/new-post" component={NewPost}/>
          <Route path="/:postId" exact component={FullPost}/>
        </Switch>
      </div>
    );
  }
}

export default Blog;
