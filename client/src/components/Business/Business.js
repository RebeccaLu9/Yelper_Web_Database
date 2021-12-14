import React from 'react';
import './Business.css';

class Business extends React.Component {
  render() {
    return (
      <div className="Business">
        <h3>
   
        <h2> {this.props.business.name}</h2>
        <h2> {this.props.business.stars? "Stars: ":""}
        {this.props.business.stars}</h2>

        <h2>{this.props.business.review_count? "Review Counts: ":""}
        {this.props.business.review_count}</h2>
    
        <h2>{this.props.business.categories? "Categories: ":""}
        {this.props.business.categories}</h2>
        <h2> {this.props.business.visitnumber? "Visits: ":""}
        {this.props.business.visitnumber}</h2>

   
        <h2> {this.props.business.bikeParking? "BikeParking: ✔️":""}</h2>
        <h2> {this.props.business.creditCard? "creditCard: ✔️":""}</h2>
        <h2> {this.props.business.reservation? "reservation: ✔️":""}</h2>
        <h2> {this.props.business.outdoorSeating? "outdoorSeating: ✔️":""}</h2>
 

        <h2>{this.props.business.funny_review ? "Funny Review: ":""}
        {this.props.business.funny_review}</h2>
        
        <h2>{this.props.business.city} {this.props.business.state}</h2>
        </h3>
      </div>
    );
  }
}

export default Business;
