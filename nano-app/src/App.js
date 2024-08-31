import Homepage from './pages/Homepage/Homepage';
import {Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import axios from 'axios';
import Login from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import Beneficiaries from './pages/Beneficiaries/Beneficiaries';
import TransferMoney from './pages/TransferMoney/TransferMoney';
import UserTransactionHistory from './pages/UserTransactionHistory/UserTransactionHistory';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminTransactions from './pages/AdminTransactions/AdminTransactions';
import AdminUsers from './pages/AdminUsers/AdminUsers';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-profile' element={<UserProfile />} />   
        <Route path='/beneficiaries' element={<Beneficiaries />} />
        <Route path='/transfer-money' element={<TransferMoney />} />  
        <Route path='/transaction-history' element={<UserTransactionHistory />} />
        <Route path='/admin/login' element={<AdminLogin />} />    
        <Route path='/admin/transactions' element={<AdminTransactions />} />    
        <Route path='/admin/users' element={<AdminUsers />} />    

      </Routes>
    </div>
  );
}

export default App;
