import Table from "./components/Table";
import Navbar from "./components/Navbar";
import NewData from "./components/NewData";
import About from "./components/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Table />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/create">
            <NewData />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
