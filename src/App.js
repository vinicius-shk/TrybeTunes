import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.saveInformation = this.saveInformation.bind(this);
    this.state = {
      loginName: '',
      loadingAPI: false,
      disableButton: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationCheck());
  }

  async saveInformation() {
    const { loginName } = this.state;
    this.setState({
      loadingAPI: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({ loadingAPI: false });
    });
  }

  validationCheck() {
    const { loginName } = this.state;
    const validateLength = 3;
    if (loginName.length >= validateLength) this.setState({ disableButton: false });
    else this.setState({ disableButton: true });
  }

  render() {
    const { loginName, disableButton, loadingAPI } = this.state;
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            path="/profile/edit"
            render={ (props) => (
              <ProfileEdit
                { ...props }
              />) }
          />
          <Route
            path="/profile"
            render={ (props) => (
              <Profile
                { ...props }
              />) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (
              <Album
                { ...props }
              />) }
          />
          <Route
            path="/favorites"
            render={ (props) => (
              <Favorites
                { ...props }
              />) }
          />
          <Route
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
              />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                value={ loginName }
                handleChange={ this.handleChange }
                disableButton={ disableButton }
                createUser={ this.saveInformation }
                loadingAPI={ loadingAPI }
              />) }
          />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
