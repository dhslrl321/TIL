import React from 'react';
import TVPresenter from "./TVPresenter";
import { tvApi } from '../../api';

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToady: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      const {
        data: { results: airingToady }
      } = await tvApi.aringToday();

      this.setState({
        topRated,
        popular,
        airingToady
      })

    } catch {
      this.setState({
        error: "Can't find Tv information"
      })
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { topRated, popular, airingToady, error, loading } = this.state;
    console.log(this.state);
    return <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToady={airingToady}
      error={error}
      loading={loading} />
  }
}