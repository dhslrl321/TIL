import React from 'react';
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcomming: null,
    popular: null,
    error: null,
    loading: true
  };

  render() {
    const { nowPlaying, upcomming, popular, error, loading } = this.state;
    return <SearchPresenter
      nowPlaying={nowPlaying}
      upcomming={upcomming}
      popular={popular}
      error={error}
      loading={loading} />
  }
}