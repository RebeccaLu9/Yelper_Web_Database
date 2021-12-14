import React, { useState } from "react"
import BusinessList from "../components/BusinessList/BusinessList"

const SearchUser = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState([])

  const fetchData= () => {
    fetch("http://127.0.0.1:8080/searchAll")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  return (
    <div>
      <button  onClick={fetchData}>Fuck</button>
      {/* <input onChange={fetchData} label="Search User" /> */}
      <input type = {Text} placeholder= "Start" 
      onChange={event => {setSearchTerm(event.target.value)}}/>
      {/* <BusinessList businesses={users}/> */}
      {users.length > 0 && (
        <ul>
          {users.filter((val) =>{
            if (searchTerm == ""){
              return val
            }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
          }
          ).map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchUser