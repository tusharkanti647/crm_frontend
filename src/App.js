import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeMain from './components/home/HomeMain';
import SignUp from './components/signUP_signIn/SignUp';
import SignIn from './components/signUP_signIn/SignIn';
import CustomerAddPage from './components/from/CustomerAddPage';
import CustomerEditPage from './components/from/CustomerEditPage';
import Navbar from './components/header/Navbar';
import CustomerDetails from './components/customerDetails/CustomerDetails';
//import CustomerAdd from './components/from/CustomerAdd';
//import CustomerAdd from './components/from/customerAdd'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeMain />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
        <Route path='/customerAdd' element={<CustomerAddPage />}></Route>
        <Route path='/customerEdit/:id' element={<CustomerEditPage />}></Route>
        <Route path='/customerDetails/:id' element={<CustomerDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
