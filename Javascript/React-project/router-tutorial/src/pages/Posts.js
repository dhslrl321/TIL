import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Post } from './Post';

const Posts = ({ match }) => {
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        <li><Link to={`${match.url}/1`}>Post #1</Link></li>
        <li><Link to={`${match.url}/2`}>Post #2</Link></li>
        <li><Link to={`${match.url}/3`}>Post #3</Link></li>
        <li><Link to={`${match.url}/4`}>Post #4</Link></li>
      </ul>
    </div>
  );
}