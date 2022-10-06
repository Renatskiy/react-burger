import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import Footer from '../../footer'
import Main from '../Main/Main'
import { mockOrder } from "../../lib/mock-order";
import { mockData } from "../../lib/mock-data";

export default function App() {
  return (
    <div className={`${styles.app} ${styles.container}`}>
        <AppHeader/>
        <Main items={mockData} orders={mockOrder} />
        <Footer/>
    </div>
  );
}

