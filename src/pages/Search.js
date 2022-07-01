import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Search extends React.Component {
  render() {
    const { loadingAPI } = this.props;
    return (
      <div data-testid="page-search">{ loadingAPI ? <Loading /> : 'Um teste' }</div>
    );
  }
}

Search.propTypes = {
  loadingAPI: PropTypes.bool,
}.isRequired;

export default Search;
