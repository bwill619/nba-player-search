
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      players:[],
    }
    this.searchFunction = this.searchFunction.bind(this);
  }

  searchFunction() {
    //search function
    var input, filter, table, tr, td, i, textValue;
    input = document.getElementById("textBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("playerTable");
    tr = document.getElementsByTagName("tr");

    for(i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if(td) {
        textValue = td.textContent || td.innerText;
        if(textValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        }
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async componentDidMount() {
    const url = 'https://www.balldontlie.io/api/v1/players'
    let result = null;
    try {
      result = await axios(url, {
        headers: {
          Accept: "application/json"
        }
      })
    } catch(e) {
      console.log(e)
    }
    this.setState({players : result.data.data})
  }

  
  render(){
    const{players} = this.state;
    console.log({players})
    let mappedArray = (players).map((players) => {
      return(
        <table class="playerTable" id="playerTable">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Team</th>
          </tr>
          <tr>
            <td>{players.first_name}</td>
            <td>{players.last_name}</td>
            <td>{players.height_feet}'{players.height_inches}</td>
            <td>{players.weight_pounds}</td>
            <td>{players.team.full_name}</td>
          </tr>
        </table>
      )
    })
  return (
    <div className="App">
      <h1 className='nbaTitle'>NBA Player Search</h1>
      <body class="appBody">
        <form>
          <label for="search" class="searchLabel">Search For Player:</label>
          <input type="text" class="textBar" id="textBar" onkeyup="searchFunction()" name ="search"></input>
          <input type="button" class="playerButton" onclick = "searchFunction()" value="Search"></input>
        </form>
        <ul className="testing">
          {mappedArray}
          </ul>
      </body>
    </div>
  );
}
}

export default App;
