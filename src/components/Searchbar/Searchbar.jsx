import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  Input,
  SubmitBtn,
  Span,
} from './SearchBar.styled';
// import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim()===''){
        alert('input data')
        return
    }
    this.props.queryInput(this.state.value);
    this.setState({value:''})
  };

  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SubmitBtn type="submit" />
          <Span>Search</Span>
          <Input
            type="text"
            required
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Form.propTypes={
  value:PropTypes.string
}