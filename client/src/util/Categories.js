import React, { useState } from "react"
// import { search } from "superagent"
import BusinessList from "../components/BusinessList/BusinessList"
import './Categories.css'

const FindCategories = () => {
  const [business, setBusiness] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [searchTerm, setSearchTerm] = useState([])
  const [searchLocation, setSearchLocation] = useState([])

  const [parking,  setParking] = useState(false)
  const [credit,  setCredit] = useState(false)
  const [reservation,  setReservation] = useState(false)
  const [outdoorSitting,  setOutdoorSitting] = useState(false)


  const parkingClass = () => {
    if( parking == true ){
      return "active";
    } else {
      return "";
    }
  };

  const creditClass = () => {
    if( credit == true ){
      return "active";
    } else {
      return "";
    }
  };

  const outdoorSittingClass = () => {
    if( outdoorSitting == true ){
      return "active";
    } else {
      return "";
    }
  };

  const reservationClass = () => {
    if( reservation == true ){
      return "active";
    } else {
      return "";
    }
  };

  const onClickParking = () =>{
    setParking(!parking)
  }

  const onClickCredit = () =>{
    setCredit(!credit)
  }

  const onClickOutdoorSitting = () =>{
    setOutdoorSitting(!outdoorSitting)
  }

  const onClickReservation = () =>{
    setReservation(!reservation)
  }

  const fetchChina = () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findChinese")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchUS = () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findAmerica")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchJapan= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findJapan")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchMexican= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findMexica")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchSalad= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findSalad")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchFastFood= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findFastFood")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchSeafood= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findSeafood")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchBreakfast= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findBreakfast")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchBars= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findBars")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchCafe= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/findCafe")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchAll =  () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/searchAll")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }
  
  const buttonStyle = {
    borderRadius: '10px',
    border: '2px solid',
    borderColor: '#bb8445',
    color: '#bb8445',
    padding: '8px 16px', 
  };

  console.log(business)
  return (
    <div>
      <div className="SearchBar">
        <div className="SearchBar-sort-options">

        {/* <div className="SearchBar-submit">
          <a onClick={event => {setParking(!parking)}}>Parking</a>
        </div> */}
        <div className="SearchBar-sort-options">
          <ul>
            
            <li onClick={onClickParking} className={parkingClass()}>Bike_Parking</li>
            <li onClick={onClickReservation} className={reservationClass()}>Reservation</li>
            <li onClick={onClickCredit} className={creditClass()}>Credit_Card</li>
            <li onClick={onClickOutdoorSitting} className={outdoorSittingClass()}>Outdoor_Seating</li>
          </ul>
        </div>

        <div className="SearchBar-fields">
            <input type = {Text} placeholder= "Search Category" 
            onChange={event => {setSearchTerm(event.target.value)}}/>
    
            <input type = {Text} placeholder= "Search Location" 
            onChange={event => {setSearchLocation(event.target.value)}}/>
        </div>


            <div className="SearchBar-submit">
              <a onClick={fetchAll}>Start All</a>
            </div>

        </div>
      </div>

      <h3>Top Business</h3>
      <div className="buttonList">
        <button style={buttonStyle} onClick={fetchChina}>Chinese</button>
        <button style={buttonStyle} onClick={fetchUS}>American</button>
        <button style={buttonStyle} onClick={fetchJapan}>Japanese</button>
        <button style={buttonStyle} onClick={fetchMexican}>Mexican</button>
        <button style={buttonStyle} onClick={fetchSalad}>Salad</button>
        <button style={buttonStyle} onClick={fetchFastFood}>Fast Food</button>
        <button style={buttonStyle} onClick={fetchSeafood}>Seafood</button>
        <button style={buttonStyle} onClick={fetchBreakfast}>Breakfast</button>
        <button style={buttonStyle} onClick={fetchBars}>Bars</button>
        <button style={buttonStyle} onClick={fetchCafe}>Cafe</button>
      </div>
      
      <div className="loading">
        {error && <p>{error}</p>}
      </div>
      <div className="loading">
      {isLoading && error.length === 0 && <p>Loading...</p>}
      </div>
      <BusinessList businesses={business.filter( (val) =>{
            var b_bikeParking = true
            if(val.bikeParking != 'True'){
              b_bikeParking = false
            }
            var b_credit = true
            if(val.creditCard != 'True'){
              b_credit = false
            }
            var b_outdoor = true
            if(val.outdoorSeating != 'True'){
              b_outdoor = false
            }
            var b_reservation = true
            if(val.reservation != 'True'){
              b_reservation = false
            }
            
            if(parking){
              if(reservation){
                if(credit){
                  if(outdoorSitting){
                    if(b_bikeParking == parking && b_reservation == reservation && b_credit == credit && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }else{
                     return 
                   }
                  }else{
                    if(b_bikeParking == parking && b_reservation == reservation && b_credit == credit){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }

                }else{
                  if(outdoorSitting){
                    if(b_bikeParking == parking && b_reservation == reservation  && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_bikeParking == parking && b_reservation == reservation){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }
                }
              }else{
                if(credit){
                  if(outdoorSitting){
                    if(b_bikeParking == parking && b_credit == credit && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_bikeParking == parking  && b_credit == credit ){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }

                }else{
                  if(outdoorSitting){
                    if(b_bikeParking == parking  && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_bikeParking == parking ){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }
                }
              }
            }
            else{
              if(reservation){
                if(credit){
                  if(outdoorSitting){
                    if( b_reservation == reservation && b_credit == credit && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_reservation == reservation && b_credit == credit ){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }

                }else{
                  if(outdoorSitting){
                    if(b_reservation == reservation && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_reservation == reservation ){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }
                }
              }else{
                if(credit){
                  if(outdoorSitting){
                    if(b_credit == credit && b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if(b_credit == credit ){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }
                }else{
                  if(outdoorSitting){
                    if(b_outdoor == outdoorSitting){
                      if (val.categories == null || val.city == null || val.state == null){
                        return val
                      }
                      else if (searchTerm == "" && searchLocation == ""){
                        return val
                      }else if (val.categories.toLowerCase().includes(searchTerm)
                      && searchLocation == ""
                      ){
                          return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && searchTerm == ""
                      ){
                        return val
                      }else if (  (val.city.toLowerCase().includes(searchLocation)
                      || val.state.toLowerCase().includes(searchLocation)
                      )
                      && val.categories.toLowerCase().includes(searchTerm)
                      ){
                        return val
                      }
                   }
                  }else{
                    if (val.categories == null || val.city == null || val.state == null){
                      return val
                    }
                    else if (searchTerm == "" && searchLocation == ""){
                      return val
                    }else if (val.categories.toLowerCase().includes(searchTerm)
                    && searchLocation == ""
                    ){
                        return val
                    }else if (  (val.city.toLowerCase().includes(searchLocation)
                    || val.state.toLowerCase().includes(searchLocation)
                    )
                    && searchTerm == ""
                    ){
                      return val
                    }else if (  (val.city.toLowerCase().includes(searchLocation)
                    || val.state.toLowerCase().includes(searchLocation)
                    )
                    && val.categories.toLowerCase().includes(searchTerm)
                    ){
                      return val
                    }
                  }
                }
              }
            }
         

            // if(b_bikeParking == parking && b_reservation == reservation && b_credit == credit && b_outdoor == outdoorSitting){
            //    var m =  val
            // }
      
            // else if (searchTerm == "" && searchLocation == ""){
            //   return m
            // }else if (m.categories.toLowerCase().includes(searchTerm.toLowerCase())
            // && searchLocation == ""
            // ){
            //     return m
            // }else if (  (m.city.toLowerCase().includes(searchLocation)
            // || m.state.toLowerCase().includes(searchLocation)
            // )
            // && searchTerm == ""
            // ){
            //   return m
            // }else if (  (m.city.toLowerCase().includes(searchLocation)
            // || m.state.toLowerCase().includes(searchLocation)
            // )
            // && m.categories.toLowerCase().includes(searchTerm.toLowerCase())
            // ){
            //   return m
            // }

            
            // if (val.categories == null || val.city == null || val.state == null){
            //   return val
            // }
            // else if (searchTerm == "" && searchLocation == ""){
            //   return val
            // }else if (val.categories.toLowerCase().includes(searchTerm.toLowerCase())
            // && searchLocation == ""
            // ){
            //     return val
            // }else if (  (val.city.toLowerCase().includes(searchLocation)
            // || val.state.toLowerCase().includes(searchLocation)
            // )
            // && searchTerm == ""
            // ){
            //   return val
            // }else if (  (val.city.toLowerCase().includes(searchLocation)
            // || val.state.toLowerCase().includes(searchLocation)
            // )
            // && val.categories.toLowerCase().includes(searchTerm.toLowerCase())
            // ){
            //   return val
            // }
          }


          
          )}/>
    </div>
  )
}

export default FindCategories

 