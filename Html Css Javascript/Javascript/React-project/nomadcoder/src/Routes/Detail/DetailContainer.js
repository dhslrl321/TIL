import React from 'react';
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      } } = this.props;

    console.log(id);

  }

  render() {
    const { result, error, loading } = this.state;

    return <DetailPresenter
      result={result}
      error={error}
      loading={loading} />
  }
}