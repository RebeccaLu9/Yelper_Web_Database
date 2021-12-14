import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import FindCategoriesPage3copy from './util/CategoriesPage3copy';
import MenuBar from './components/navibar';

require('dotenv').config();

class App2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: [],
      data: []
    };
  }
  


componentDidMount() {
    // Simple GET request using fetch
  
  // fetch('http://127.0.0.1:8080/searchAll')
  //       .then(response => response.json())
  //       .then(data => this.setState({ data: data}));  
}

  render() {

    return (
      <div className="App">
        <div>
          <h1>Search with More Fun</h1>
          <MenuBar></MenuBar>
        </div>
          {/* <FindCategoriesPage2></FindCategoriesPage2> */}
          <FindCategoriesPage3copy></FindCategoriesPage3copy>
          <div>
          <BusinessList businesses={this.state.businesses}/>
          </div>
      </div>
    );
  }
}

export default App2;
