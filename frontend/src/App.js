import Header from "./components/header/Header";
// import Footer from "./components/footer.js/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './app.css'

// Screens
import { LandingPage } from "./Screens/landingPage/LandingPage";
import Applications from "./Screens/Application/Applications";
import Login from "./Screens/LoginPage/Login";
import Register from "./Screens/RegisterPage/Register";
import CreateApplication from "./Screens/createApplication/CreateApplication";

function App() {
  return (
    <div className="mainBody">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} exact />
            <Route path='/myapplications' element={<Applications />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/createapplication' element={<CreateApplication />} />
          </Routes>
        </main>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
