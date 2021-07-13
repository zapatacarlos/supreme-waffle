import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StartContent from "./components/StartContent";
import { Switch, Route } from "react-router-dom";
import ListAllPokemons from "./components/ListAllPokemons";

function App() {
  
  const [data, setData] = useState([]);
  
  
/*   useEffect(() => {
    fetch("/pokemons")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []); */

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pokemons");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        <Switch>
          <Route path="/pokemonarena">
            <ListAllPokemons data={data}/>

          </Route>
          <Route path="/">
          <StartContent />
          </Route>
        </Switch>
        
      </div>
      <p>
        {/* {data[1].name.english} */}
      </p>
    </div>
  );
}



export default App;
