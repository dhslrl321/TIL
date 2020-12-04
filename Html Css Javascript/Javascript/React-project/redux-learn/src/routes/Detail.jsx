import React from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
const Detail = ({ todo }) => {
  const id = useParams();
  return <div>{todo.text}</div>;
};

function mapStateToProps(state, ownProps) {
  const {
    match: { params: id },
  } = ownProps;
  return { todo: state.find((element) => element.id === parseInt(id)) };
}

export default connect(mapStateToProps)(Detail);
