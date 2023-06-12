import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    };
  }

  componentDidMount() {
    this.fetchUrls();
  }

  fetchUrls = () => {
    getUrls()
      .then((data) => {
        this.setState({ urls: data.urls });
      })
      .catch((error) => {
        console.log('Error fetching URLs:', error);
      });
  }

  handleSubmit = (newUrl) => {
    postUrl(newUrl)
      .then((data) => {
        this.setState((prevState) => ({
          urls: [...prevState.urls, data]
        }));
      })
      .catch((error) => {
        console.log('Error posting URL:', error);
      });
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm onSubmit={this.handleSubmit} />
        </header>
        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;