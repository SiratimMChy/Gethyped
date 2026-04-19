import React from 'react';
import LenisProvider from './Components/LenisProvider';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Intro from './Components/Intro';
import Expertises from './Components/Expertises';
import SelectedWork from './Components/SelectedWork';
import Clients from './Components/Clients';
import Footer from './Components/Footer';

const App = () => {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-[#f6f2e9]">
        <Navbar />
        <Hero />
        <Intro />
        <Expertises />
        <SelectedWork />
        <Clients />
        <Footer />
      </div>
    </LenisProvider>
  );
};

export default App;
