import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home as HomeIcon } from 'styled-icons/fa-solid';
import Students from './Pages/Students';
import Coaches from './Pages/Coaches';
import Groups from './Pages/Groups';
import Schedule from './Pages/Schedule';
import Home from './Pages/Home';
import { colors } from './components/style-variables';

const Ul = styled.ul`
  display: flex;
  flex: 1 1;
  justify-content: space-around;
  list-style: none;
  background-color: ${colors.bg};
  box-shadow: 0 0 2px 2px ${colors.shadow};
  margin: 0;
  padding: 0;
  > * + * {
    position: relative;
    &::before {
      position: absolute;
      content: '>';
      top: 50;
      left: 0;
      color: ${colors.hint};
    }
  }
`;

const Li = styled.li`
  display: inline-block;
  width: 20vw;
  margin: 0;
  padding: 16px;
  text-align: center;

  > a {
    text-decoration: none;
    color: ${colors.navyBlue};

    &:hover {
      color: ${colors.content};
    }

    &:active {
      color: ${colors.skyBlue};
    }
  }
`;

const Navigation = () => (
  <Router>
    <div>
      <nav>
        <Ul>
          <Li>
            <Link to="/">
              <HomeIcon size={18} />
            </Link>
          </Li>
          <Li>
            <Link to="/students/">Students</Link>
          </Li>
          <Li>
            <Link to="/coaches/">Coaches</Link>
          </Li>
          <Li>
            <Link to="/groups/">Groups</Link>
          </Li>
          <Li>
            <Link to="/schedule/">Schedule</Link>
          </Li>
        </Ul>
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
