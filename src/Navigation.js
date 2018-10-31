import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Students from './Pages/Students';
import Coaches from './Pages/Coaches';
import Groups from './Pages/Groups';
import Schedule from './Pages/Schedule';
import Home from './Pages/Home';

const Navigation = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/students/">Students</Link>
          </li>
          <li>
            <Link to="/coaches/">Coaches</Link>
          </li>
          <li>
            <Link to="/groups/">Groups</Link>
          </li>
          <li>
            <Link to="/schedule/">Get schedule</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/students/" component={Students} />
      <Route path="/coaches/" component={Coaches} />
      <Route path="/groups/" component={Groups} />
      <Route path="/schedule/" component={Schedule} />
    </div>
  </Router>
);

export default Navigation;
