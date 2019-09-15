import React, { Component } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
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
                    >Posts</NavLink></li>
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
        <Switch>
          <Route path="/new-post" component={NewPost}/>
          <Route path="/" component={Posts}/>
        </Switch>
      </div>
    );
  }
}

export default Blog;
