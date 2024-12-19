// import './App.css';
// import { Routes, Route } from "react-router-dom";
// import NavBar from './components/Shared/NavBar';
// import Home from './Pages/Home';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import Dashboard from './Pages/Admin/Dashboard';
// import Footer from './components/Shared/Footer/Footer';
// import RequireAuth from './components/Shared/RequireAuth';
// import Package from './Pages/Package';
// import PayNow from './Pages/PayNow';
// import PendingPayment from './Pages/PendingPayment';
// import Setting from './Pages/Admin/Setting';
// import SettingPayment from './Pages/Admin/SettingPayment';
// import AdminRoute from './components/Shared/AdminRoute';
// import ManagerRoute from './components/Shared/ManagerRoute';
// import ResetPassword from './Pages/ResetPassword';
// import UpdatePassword from './Pages/UpdatePassword';
// import ErrorPage from './Pages/ErrorPage';
// import AllProfileList from './Pages/Admin/AllProfileList';
// import EditUserProfile from './Pages/Admin/EditUserProfile';

// import PricePage from './Pages/PricePage';
// import ScrollToTop from 'react-scroll-to-top';
// import ScrollToTopOnRoute from './components/Shared/ScrollToTopOnRoute';
// import ManageUsers from './Pages/Admin/ManageUsers';
// import { User } from 'lucide-react';
// import AuditManagement from './Pages/Admin/AuditManagement';
// import { Toaster } from 'react-hot-toast';
// import ThankYouPage from './components/Shared/ThankYouPage';
// import ContactPage from './components/Shared/ContactPage';
// import ContactMessageManagement from './Pages/Admin/ContactMessageManagement';
// import Plans from './components/SeoHomePage/Plans';


// function App() {

//   return (
//     <body>
//       <div id="scroll-content">
//         <Toaster />
//         <NavBar></NavBar>
//         <ScrollToTopOnRoute />
//         <div>
//           <Routes>
//             <Route path='/' element={<Home></Home>}></Route>
//             <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
//             <Route path='/thank-you' element={<ThankYouPage></ThankYouPage>}></Route>
//             <Route path='/premium-plan' element={<Plans></Plans>}></Route>
//             <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
//             <Route path='/login' element={<Login></Login>}></Route>
//             <Route path='/register' element={<Register></Register>}></Route>
//             <Route path='/reset' element={<ResetPassword></ResetPassword>}></Route>
//             <Route path='/update-password' element={<UpdatePassword></UpdatePassword>}></Route>
//             <Route path='/pricing' element={<PricePage></PricePage>}></Route>
//             <Route path='/package/:id' element={<RequireAuth><Package /></RequireAuth>}></Route>
//             <Route path='/pay-now/:id' element={<RequireAuth><PayNow></PayNow></RequireAuth>}></Route>
//             <Route path='/pending-payment/' element={<RequireAuth><PendingPayment /></RequireAuth>}></Route>
//             <Route path='/admin/dashboard' element={<RequireAuth><ManagerRoute><Dashboard></Dashboard></ManagerRoute></RequireAuth>}></Route>
//             <Route path='/admin/setting' element={<RequireAuth><AdminRoute><Setting /></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/setting-payment' element={<RequireAuth><AdminRoute><SettingPayment /></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/manage-profiles/' element={<RequireAuth><AdminRoute><AllProfileList /></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/edit-user-profile/:id' element={<RequireAuth><AdminRoute><EditUserProfile></EditUserProfile></AdminRoute></RequireAuth>}></Route>

//             <Route path='/admin/manage-users/' element={<RequireAuth><AdminRoute><ManageUsers /></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/user/:id' element={<RequireAuth><AdminRoute><User></User></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/audit-management' element={<RequireAuth><AdminRoute><AuditManagement></AuditManagement></AdminRoute></RequireAuth>}></Route>
//             <Route path='/admin/message-management' element={<RequireAuth><AdminRoute><ContactMessageManagement></ContactMessageManagement></AdminRoute></RequireAuth>}></Route>
//           </Routes>
//         </div>
//         <Footer></Footer>
//       </div>
//       <ScrollToTop smooth style={{ padding: '0px' }} />
//     </body>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/Shared/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Admin/Dashboard';
import Footer from './components/Shared/Footer/Footer';
import RequireAuth from './components/Shared/RequireAuth';
import Package from './Pages/Package';
import PayNow from './Pages/PayNow';
import PendingPayment from './Pages/PendingPayment';
import Setting from './Pages/Admin/Setting';
import SettingPayment from './Pages/Admin/SettingPayment';
import AdminRoute from './components/Shared/AdminRoute';
import ManagerRoute from './components/Shared/ManagerRoute';
import ResetPassword from './Pages/ResetPassword';
import UpdatePassword from './Pages/UpdatePassword';
import ErrorPage from './Pages/ErrorPage';
import AllProfileList from './Pages/Admin/AllProfileList';
import EditUserProfile from './Pages/Admin/EditUserProfile';
import PricePage from './Pages/PricePage';
import ScrollToTop from 'react-scroll-to-top';
import ScrollToTopOnRoute from './components/Shared/ScrollToTopOnRoute';
import ManageUsers from './Pages/Admin/ManageUsers';
import { User } from 'lucide-react';
import AuditManagement from './Pages/Admin/AuditManagement';
import { Toaster } from 'react-hot-toast';
import ThankYouPage from './components/Shared/ThankYouPage';
import ContactPage from './components/Shared/ContactPage';
import ContactMessageManagement from './Pages/Admin/ContactMessageManagement';
import Plans from './components/SeoHomePage/Plans';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Reload the page when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <body>
      <div id="scroll-content">
        <Toaster />
        <NavBar></NavBar>
        <ScrollToTopOnRoute />
        <div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
            <Route path='/thank-you' element={<ThankYouPage></ThankYouPage>}></Route>
            <Route path='/premium-plan' element={<Plans></Plans>}></Route>
            <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/reset' element={<ResetPassword></ResetPassword>}></Route>
            <Route path='/update-password' element={<UpdatePassword></UpdatePassword>}></Route>
            <Route path='/pricing' element={<PricePage></PricePage>}></Route>
            <Route path='/package/:id' element={<RequireAuth><Package /></RequireAuth>}></Route>
            <Route path='/pay-now/:id' element={<RequireAuth><PayNow></PayNow></RequireAuth>}></Route>
            <Route path='/pending-payment/' element={<RequireAuth><PendingPayment /></RequireAuth>}></Route>
            <Route path='/admin/dashboard' element={<RequireAuth><ManagerRoute><Dashboard></Dashboard></ManagerRoute></RequireAuth>}></Route>
            <Route path='/admin/setting' element={<RequireAuth><AdminRoute><Setting /></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/setting-payment' element={<RequireAuth><AdminRoute><SettingPayment /></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/manage-profiles/' element={<RequireAuth><AdminRoute><AllProfileList /></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/edit-user-profile/:id' element={<RequireAuth><AdminRoute><EditUserProfile></EditUserProfile></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/manage-users/' element={<RequireAuth><AdminRoute><ManageUsers /></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/user/:id' element={<RequireAuth><AdminRoute><User></User></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/audit-management' element={<RequireAuth><AdminRoute><AuditManagement></AuditManagement></AdminRoute></RequireAuth>}></Route>
            <Route path='/admin/message-management' element={<RequireAuth><AdminRoute><ContactMessageManagement></ContactMessageManagement></AdminRoute></RequireAuth>}></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </div>
      <ScrollToTop smooth style={{ padding: '0px' }} />
    </body>
  );
}

export default App;