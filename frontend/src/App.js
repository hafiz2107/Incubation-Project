import Header from "./components/header/Header";
import Footer from "./components/footer.js/Footer";
// import './app.css'
import { LandingPage } from "./Screens/landingPage/LandingPage";
import Applications from "./Screens/Application/Applications";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="mainBody">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} exact/>
            <Route path='/myapplications' element={<Applications />} />
            {/* <Route path='/createapplication' element={} /> */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
