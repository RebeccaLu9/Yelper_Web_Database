import React, { useState } from "react"
import BusinessList from "../components/BusinessList/BusinessList"
import './Categories.css'

const FindCategoriesPage3copy = () => {
  const [business, setBusiness] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [searchTerm, setSearchTerm] = useState([])
  const [searchLocation, setSearchLocation] = useState([])
  const [userId, setUserId] = useState([])

  //有用不用改 API 10 改了名字
  const fetchActiveUser= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/categoryActiveUser")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }
  //fetch API 7
  const fetchInfluencer= () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/highScoreFans")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }
  //已改 API8 抓取系统时间又问题
  const fetchOpenReview =  async(cityname) => {
    setIsLoading(true)
    fetch(`http://127.0.0.1:8080/openReview/${cityname}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }else{
          throw new Error("Please check input")
        }
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  const fetchcityMostTip =  () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/cityMostTip")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }


  //已改 API9，抓取系统时间又问题
  const fetchOpenTip =  async (cityname) => {
    setIsLoading(true)
    fetch(`http://127.0.0.1:8080/openTip/${cityname}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }else{
          throw new Error("Please check input")
        }
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

   //已改，API5
   const fetchFunnyReview =  () => {
    setIsLoading(true)
    fetch("http://127.0.0.1:8080/cityMostReview")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      })
  }

  //这个有用，但是需要改
  const fetchFriendTip =  (userId) => {
    //FGperykVyoM81lDpGev1Dw
    setError("")
    setIsLoading(true)
    var url = `http://127.0.0.1:8080/userFriendTip/${userId}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }else{
          throw new Error("Please put valid UserID")
        }
      })
      .then(data => {
        setIsLoading(false)
        setBusiness(data)
      }).catch(error => {
        setError(error.message)
      })
  }
  

  const buttonStyle = {
    borderRadius: '10px',
    border: '2px solid',
    borderColor: '#bb8445',
    color: '#bb8445',
    padding: '8px 16px', 
  };
  console.log(searchLocation)
  return (
    <div>
      <div className="SearchBar">
        <div className="SearchBar-sort-options">

        <div className="SearchBar-fields">
            {/* <input type = {Text} placeholder= "Search Name" 
            onChange={event => {setSearchTerm(event.target.value)}}/> */}
            
            <input type = {Text} placeholder= "Search Location" 
            onChange={event => {setSearchLocation(event.target.value)}}/>
        </div>
            <div className="SearchBar-submit">
              <a onClick={() => fetchOpenTip(searchLocation)}>Open Business with Most Tips</a>&nbsp;&nbsp;
              <a onClick={() => fetchOpenReview(searchLocation)}>Open Business with Most Reviews</a>
            
            </div>
        </div> 
      </div>

      <h3>Top Business</h3>
      
      <div className="buttonList">
        {/* <button style={buttonStyle} onClick={fetchActiveUser}>Get Ideas From Active Users</button>
        
        <button style={buttonStyle} onClick={fetchInfluencer}>Get Ideas From Influencers</button> */}
        <button style={buttonStyle} onClick={fetchActiveUser}>Categories from Active Users</button>
        
        <button style={buttonStyle} onClick={fetchInfluencer}>Get Ideas From Influencers</button>
        <button style={buttonStyle} onClick={fetchcityMostTip}>Business Receives Most Tips</button>
        <button style={buttonStyle} onClick={fetchFunnyReview}>Business Receives Most Funny Reviews</button>
      </div>
      <div className="buttonList">
        <input type = {Text} placeholder= "UserID" 
            onChange={event => {setUserId(event.target.value)}}/>
        {/* {userId && <p>{userId}</p>} */}
        <button style={buttonStyle} onClick={() => fetchFriendTip(userId)}>Where Friends Go
        </button>
      </div>
   
      
      <div className="loading">
        {error && <p>{error}</p>}
      </div>
      <div className="loading">
      {isLoading && error.length === 0 && <p>Loading...</p>}
      </div>
      
      <BusinessList businesses={business.filter((val) =>{
          if (val.city == null || val.state == null){
            return val
          }
          else if (searchLocation == ""){
            return val
          }else if ((val.city.toLowerCase().includes(searchLocation)
          || val.state.toLowerCase().includes(searchLocation)
          )
          ){
            return val
          }
          }
          )}/>
      
    </div>
  )
}

export default FindCategoriesPage3copy

 