import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  Input,
  SubmitBtn,
  Span,
} from './SearchBar.styled';

export const Form =({queryInput})=> {
 const [request, setRequest] = useState('')
  
  const handleSubmit = e => {
    e.preventDefault();
    if (request.trim()===''){
        alert('input data')
        return
    }
    queryInput(request);
    setRequest('')
  };

  const handleChange = e => {
    setRequest(e.target.value.toLowerCase())
  };

    return (
      <SearchBar>
        <SearchForm onSubmit={handleSubmit}>
          <SubmitBtn type="submit" />
          <Span>Search</Span>
          <Input
            type="text"
            required
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={request}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
}

Form.propTypes={
  value:PropTypes.string
}
