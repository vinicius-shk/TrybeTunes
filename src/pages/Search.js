import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.state = {
      searchName: '',
      disableButton: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationCheck());
  }

  validationCheck() {
    const { searchName } = this.state;
    const validateLength = 2;
    if (searchName.length >= validateLength) this.setState({ disableButton: false });
    else this.setState({ disableButton: true });
  }

  render() {
    const { searchName, disableButton } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          <label htmlFor="search-artist">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchName"
              id="search-artist"
              placeholder="Nome ou artista"
              value={ searchName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disableButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
