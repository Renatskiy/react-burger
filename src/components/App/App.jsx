import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import Footer from '../../footer'
import Main from '../Main/Main'
import { mockOrder } from "../../lib/mock-order";
import { mockData } from "../../lib/mock-data";

export default function App() {
  return (
    <div className="App">
      <AppHeader />
      <Main items={mockData} orders={mockOrder} />
    </div>
  );
}

