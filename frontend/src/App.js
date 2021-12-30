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
import AdminHome from "./Screens/AdminHome/AdminHome";
import ViewApplications from "./Screens/ViewApplications/ViewApplications";
import RecordList from "./Screens/RecordList/RecordList";
import Seat from "./Screens/Slots/Seat";
import SetApplication from "./Store/ApplicationContext";
import ViewSlots from "./Screens/ViewSlots/viewSlots";

function App() {
  return (

    <div className="mainBody">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} exact />
            <Route path='/myapplications' element={<Applications />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/createapplication' element={<CreateApplication />} />
            <Route path='/adminhome' element={<AdminHome />} />

            <Route path='/viewapplications' element={
              <SetApplication>
                <ViewApplications />
              </SetApplication>
            } />

            <Route path='/recordlist' element={<RecordList />} />
            <Route path='/bookslot' element={
              <SetApplication>
                <Seat />
              </SetApplication>
            } />
            <Route path='/viewslots' element={<ViewSlots />}/>
          </Routes>
        </main>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>

  );
}

export default App;
