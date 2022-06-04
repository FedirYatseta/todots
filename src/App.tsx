import React, { FC, useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/screens/Home';
import SingUpScreen from './client/screens/Register';
import Footer from './client/Component/Footer';
import NotFound404 from './client/screens/NotFound404';
import Header from './client/Component/Header';
import Layout from './client/Component/layout';
import Login from './client/screens/Login';
import Register from './client/screens/Register';
import Unauthorized from './client/Component/Unauthorized';
import RequireAuth from './client/Component/RequireAuth';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}


const App: FC = () => {

  return (
    <>
      <Header />
      <main className='main'>
        <Container>
          <Routes>
            <Route path="/" element={<Layout />} >
              {/* public routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route path='/signup' element={<SingUpScreen />} />
              {/* catch all */}
              <Route path='/*' element={<NotFound404 />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
