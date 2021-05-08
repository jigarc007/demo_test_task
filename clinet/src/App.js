import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import UserList from "./components/UserList/UserList";
import RegisterUser from "./components/RegisterUser/RegisterUser";

function App() {
  const id = localStorage.getItem("id");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignInForm} />
          <Route exact path="/sign-in" component={SignInForm} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/users-list" component={UserList} />
          <Route exact path="/add-User" component={RegisterUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
