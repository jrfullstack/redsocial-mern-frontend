// import React from 'react';
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";

import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";

import { Login } from "../components/user/Login";
import { Logout } from "../components/user/Logout";
import { Register } from "../components/user/Register";
import { People } from "../components/user/People";
import { Config } from "../components/user/Config";
import { Feed } from "../components/publication/Feed";
import { Following } from "../components/follow/Following";
import { Followers } from "../components/follow/Followers";

export const Routing = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Register />} />
            </Route>

            <Route path="/social" element={<PrivateLayout />}>
              <Route index element={<Feed />} />
              <Route path="feed" element={<Feed />} />
              <Route path="logout" element={<Logout />} />
              <Route path="people" element={<People />} />
              <Route path="ajustes" element={<Config />} />
              <Route path="siguiendo/:userId" element={<Following />} />
              <Route path="siguidores/:userId" element={<Followers />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <div>
                    <h1>Error 404</h1>
                    <Link to="/">Volver al inicio</Link>
                  </div>
                </>
              }></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
}
