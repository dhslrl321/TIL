import React from 'react';
import HomePresenter from "./HomePresenter";
import { movieApi } from "../../api";
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcomming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      movieApi;
    } catch {
      this.setState({
        error: "Can't find Movies information."
      })
    } finally {
      this.setState({
        loading: false,

      })
    }
  }

  render() {
    const { nowPlaying, upcomming, popular, error, loading } = this.state;
    return <HomePresenter
      nowPlaying={nowPlaying}
      upcomming={upcomming}
      popular={popular}
      error={error}
      loading={loading} />
  }
}