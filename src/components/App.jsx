import { Form } from '../components/Searchbar/Searchbar';
import { AppStyled } from './App.styled';
import { Component } from 'react';
import { Gallery } from '../components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export class App extends Component {


  state = {
    query: '',
  };

  formHandler = data => {
    this.setState({ query: data });
  };

  render() {
    return (
      <AppStyled>
        <Form queryInput={this.formHandler} />
        <Gallery  setquery = {this.state.query}/>
      </AppStyled>
    );
  }
}
App.propTypes = {
  query: PropTypes.string
}