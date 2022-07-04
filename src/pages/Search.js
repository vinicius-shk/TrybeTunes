import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      searchName: '',
      nameSeached: '',
      disableButton: true,
      apiLoading: false,
      hasSeached: false,
      musicArray: [],
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationCheck());
  }

  onClick(event) {
    const { searchName } = this.state;
    this.setState({ apiLoading: true, nameSeached: searchName }, async () => {
      const musicArray = await searchAlbumsAPI(searchName);
      this.setState({ apiLoading: false, musicArray, searchName: '', hasSeached: true });
    });
    event.preventDefault();
  }

  validationCheck() {
    const { searchName } = this.state;
    const validateLength = 2;
    if (searchName.length >= validateLength) this.setState({ disableButton: false });
    else this.setState({ disableButton: true });
  }

  render() {
    const {
      searchName,
      disableButton,
      apiLoading,
      musicArray,
      hasSeached,
      nameSeached } = this.state;
    const message = 'Nenhum álbum foi encontrado';
    const musicList = (
      <>
        <span>
          {`Resultado de álbuns de: ${apiLoading ? '' : nameSeached}` }
        </span>
        <ul>
          {
            musicArray
              .map(({ artworkUrl100, collectionId, collectionName }) => (
                <li key={ collectionId }>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    <img src={ artworkUrl100 } alt={ `Álbum ${collectionName}` } />
                  </Link>
                  <span>{ collectionName }</span>
                </li>
              ))
          }
        </ul>
      </>
    );
    const musicListCond = (
      <div>
        { musicArray.length === 0 ? message : musicList }
      </div>);

    const loadingCond = apiLoading ? <Loading /> : musicListCond;

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
            type="submit"
            disabled={ disableButton }
            onClick={ this.onClick }
          >
            Pesquisar
          </button>
        </form>
        { !hasSeached ? <div /> : loadingCond }
      </div>
    );
  }
}

export default Search;
