import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Navbar, Nav, NavItem, Grid, Row
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UrlInputContainer from './UrlInputContainer';
import Footer from '../components/Footer';
import styles from './App.css';

class App extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired
  };

  render() {
    const { pathname, children } = this.props;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>YouTube Speed Reader</Link>
            </Navbar.Brand>
          </Navbar.Header>

          {pathname !== '/'
            ? (
              <Nav className={styles.navCenter}>
                <Navbar.Form>
                  <UrlInputContainer />
                </Navbar.Form>
              </Nav>
            ) : null}

          <Nav pullRight>
            <LinkContainer to='/about'>
              <NavItem>about</NavItem>
            </LinkContainer>
            <LinkContainer to='/terms'>
              <NavItem>terms</NavItem>
            </LinkContainer>
            <LinkContainer to='/privacy'>
              <NavItem>privacy</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Grid>
          {children}

          <div style={{ marginTop: '50px' }}></div>
          {pathname !== '/' ? <Footer /> : null}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.location.pathname
});

export default connect(mapStateToProps)(App);
