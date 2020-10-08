import React from 'react';
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";
export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  }

  searchByTerm = async () => {
    const { searchTerm } = this.state;

    try {
      const {
        data: { results: movieResults }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: showResults }
      } = await tvApi.search(searchTerm);

      this.setState({
        movieResults,
        tvResults: showResults,
        loading: true
      });
    } catch {
      this.setState({
        error: "Can't find that"
      })
    } finally {
      this.setState({
        loading: false
      })
    }
  }
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    console.log(this.state);
    return <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      error={error}
      loading={loading}
      handleSubmit={this.handleSubmit} />
  }
}