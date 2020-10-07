import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CourseDesign from "../pages/CourseDesign";
import CourseCoding from "../pages/CourseCoding";
import Bookmark from "../pages/Bookmark";
import Contact from "../pages/Contact";
import MeetUp from '../pages/MeetUp';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/course-design" component={CourseDesign} />
      <Route path="/course-coding" component={CourseCoding} />
      <Route path="/bookmark" component={Bookmark} />
      <Route path="/meetup" component={MeetUp} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
}