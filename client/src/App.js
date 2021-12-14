import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import FindCategories from './util/Categories';
import MenuBar from './components/navibar';


require('dotenv').config();

class App extends Component {
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
          <h1>Ready to Eat</h1>
          <MenuBar></MenuBar>
        </div>
          <FindCategories></FindCategories>
          <div>
          <BusinessList businesses={this.state.businesses}/>
          </div>
      </div>
    );
  }
}

export default App;
