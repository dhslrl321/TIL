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
      const {
        data: { results: nowPlaying }
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcomming }
      } = await movieApi.upComming();
      const {
        data: { results: popular }
      } = await movieApi.popular();

      this.setState({
        nowPlaying,
        upcomming,
        popular
      })
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
    console.log(this.state);

    return <HomePresenter
      nowPlaying={nowPlaying}
      upcomming={upcomming}
      popular={popular}
      error={error}
      loading={loading} />
  }
}