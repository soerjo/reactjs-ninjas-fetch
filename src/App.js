import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import NewData from "./components/NewData";
import About from "./components/About";
import Detail from "./components/Detail";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route exact path="/">
            <Table />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/create">
            <NewData />
          </Route>
          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
