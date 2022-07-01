import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingAPI: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setState({
      loadingAPI: true,
    }, async () => {
      const user = await getUser();
      this.setState({ userName: user.name }, () => this.setState({ loadingAPI: false }));
    });
  }

  render() {
    const { loadingAPI, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loadingAPI ? <Loading /> : <p data-testid="header-user-name">{ userName }</p> }
      </header>
    );
  }
}

Header.propTypes = {
  getInformation: PropTypes.bool,
}.isRequired;

export default Header;
