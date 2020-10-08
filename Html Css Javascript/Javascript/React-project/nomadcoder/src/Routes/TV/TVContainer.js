import React from 'react';
import TVPresenter from "./TVPresenter";

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
    return <TVPresenter
      nowPlaying={nowPlaying}
      upcomming={upcomming}
      popular={popular}
      error={error}
      loading={loading} />
  }
}