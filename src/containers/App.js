import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Navbar, Nav, NavItem, Grid
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UrlInputContainer from '../containers/UrlInputContainer';
import styles from './App.css';

class App extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    error: PropTypes.string
  };

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>YouTube Speed Reader</Link>
            </Navbar.Brand>
          </Navbar.Header>

          {this.props.pathname !== '/'
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
          </Nav>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.location.pathname,
  error: state.youtube.error
});

export default connect(mapStateToProps)(App);
