import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginSignup from './Component/LoginSignup/LoginSignup';
import ContentPage from './Component/ContentPage/ContentPage';
import UserProvider from './providers/userProvider';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <Route path="/content" component={ContentPage} /> {/* Define route for ContentPage */}
        </Switch>
      </Router>
    </UserProvider>
  );
};
export default App;
