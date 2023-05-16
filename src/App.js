import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/recipes/:id">
            <Recipe />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
