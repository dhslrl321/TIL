import React from 'react';
import styled from 'styled-components';

const Section = ({ title, children }) => {
  return (
    <>
      <div>{title}</div>
      <div>
        <span>this is section</span>
        {children}
      </div>
    </>
  );
}

export default Section;
