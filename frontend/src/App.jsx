import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import ContactUs from './pages/ContactUs';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import AdminRoute from './components/AdminRoute';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminListingsPage from './pages/AdminListingsPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminQueriesPage from './pages/AdminQueriesPage';
import AdminUserInfoPage from './pages/AdminUserInfoPage';
import AdminListingInfoPage from './pages/AdminListingInfoPage';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
        {currentUser && currentUser.email === "admin777@gmail.com" ? (
            <Route path='/' element={<Admin/>} />
          ) : (
            <Route path='/' element={<Home/>} />
          )
        }
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/listing/:listingId' element={<Listing /> }/>
          <Route path='/search' element={<Search /> }/>

          {currentUser && currentUser.email === 'admin777@gmail.com' && 
            <>
              <Route path='/users' element={<AdminUsersPage />} />
              <Route path='/users/:id' element={<AdminUserInfoPage />} />
              <Route path='/listings' element={<AdminListingsPage />} />
              <Route path='/listings/:id' element={<AdminListingInfoPage />} />
              <Route path='/reports' element={<AdminReportsPage />} />
              <Route path='/queries' element={<AdminQueriesPage />} />
            </>
          }

          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
