import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, urlToShorten } = this.state;
    const newUrl = {
      title: title,
      long_url: urlToShorten
    };
    this.props.onSubmit(newUrl);
    this.setState({ title: '', urlToShorten: '' });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />

        <input
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={this.handleInputChange}
        />

        <button onClick={this.handleSubmit}>Shorten Please!</button>
      </form>
    );
  }
}

export default UrlForm;