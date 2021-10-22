import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  onInputChange = (event) => {
      this.setState({
        searchText: event.target.value
      });
  };

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchText)
  };

  render(){
    return(
      <div className="ui segment">
      <form className="ui form"
            onSubmit={this.onSearchSubmit}>
        <div className="field">
          <label htmlFor="img-search">{this.props.label}</label>
          <input className="ui input" id="img-search"
                 value = {this.state.searchText}
                 type="number" placeholder="1"
                 onChange={this.onInputChange}
                 />
        </div>
      </form>
      </div>
      );
  }
};

SearchBar.defaultProps = {
  label: 'Search:'
};

export default SearchBar;
