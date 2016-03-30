import React from 'react';
import { Navbar } from 'react-bootstrap';
import styles from './Footer.css';

const Footer = () => (
  <Navbar fixedBottom>
    <div className={styles.ad}>
      ad
    </div>
  </Navbar>
);

export default Footer;
