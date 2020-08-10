import React from 'react';

const About = ({ match }) => {
  return (
    <div>
      <h2>About {match.params.name}</h2>
    </div>
  );
};

export default About;