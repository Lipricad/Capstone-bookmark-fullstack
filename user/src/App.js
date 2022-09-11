import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./page/try";
import Register from "./page/Register";

function App() {

    return (
      <div className="App">
        <Router>
          <Link to="/register"> Register </Link>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }

export default App;