import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Autosuggest from 'react-autosuggest';

/*const testSuggestions = [
  {
    title: 'Topics',
    suggestions: [
      { name: 'foo' },
      { name: 'bar' },
      { name: 'baz' }
    ]
  },
  {
    title: 'Keywords',
    suggestions: [
      { name: 'Fungus' },
      { name: 'Badabam' },
      { name: 'Boogeymen' },
      { name: 'San Francisco' }
    ]
  }
]*/

const testSuggestions = [
  { name: 'foo' },
  { name: 'bar' },
  { name: 'baz' },
  { name: 'Fungus' },
  { name: 'Badabam' },
  { name: 'Boogeymen' },
  { name: 'San Francisco' }
]

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : testSuggestions.filter(tag =>
    tag.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

class App extends Component {

  state = {
    value: '',
    savedSuggestions: [],
    suggestions: []
  }

  // my own methods

  saveSuggestion = () => {
    this.setState(
      {
        savedSuggestions: [
          ...this.state.savedSuggestions,
          this.state.value
        ]
      }
    )
  }


  // methods copied over from
  // https://www.npmjs.com/package/react-autosuggest

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render () {

    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type something starting with f, b or s',
      value,
      onChange: this.onChange
    };

    return (
      <div className="App">
        <div className="saved-suggestions">
          {this.state.savedSuggestions.map(item => <span className="tag">{item}</span>)}
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.saveSuggestion}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default App;
