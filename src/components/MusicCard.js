import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleMusic = this.handleMusic.bind(this);
    this.renderMusicCard = this.renderMusicCard.bind(this);
    this.state = {
      checked: false,
      loadingApi: false,
    };
  }

  componentDidMount() {
    const { musicObj, favouriteSongs } = this.props;
    const favouriteCond = favouriteSongs
      .some(({ trackId }) => trackId === musicObj.trackId);
    this.setState({ checked: favouriteCond });
  }

  handleMusic({ target }) {
    this.setState({ loadingApi: true }, async () => {
      const { musicObj } = this.props;
      if (target.checked) await addSong(musicObj);
      else await removeSong(musicObj);
      this.setState({ loadingApi: false });
    });
  }

  onChange({ target }) {
    const { name, value, checked } = target;
    const newValue = target.type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  renderMusicCard() {
    const { musicObj } = this.props;
    const { trackName, previewUrl, trackId } = musicObj;
    const { checked } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `input-favourite-check${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ `input-favourite-check${trackId}` }
            name="checked"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ this.onChange }
            onClick={ this.handleMusic }
          />
        </label>
      </div>
    );
  }

  render() {
    const { loadingApi } = this.state;
    return (
      <div>
        { loadingApi ? <Loading /> : this.renderMusicCard() }
      </div>
    );
  }
}

MusicCard.propTypes = {
  splice: PropTypes.func,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
