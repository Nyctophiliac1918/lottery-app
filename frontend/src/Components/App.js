import 'bootstrap/dist/css/bootstrap.min.css';
import Tickets from './Tickets';
import Header from './Header';
import Events from './Events';
import Footer from './Footer';
import EventsTable from './EventsTable';
import Winner from './Winner';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
    return (
    <div className='wrapper'>
      <Router>
        <Header />
        <Switch>
          <Route path="/winners">
            <Winner />
          </Route>
          <Route path="/tickets/:ticketID" component={EventsTable} />
          <Route path="/tickets">
            <Tickets />
          </Route>
          <Route path="/">
            <Events />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
