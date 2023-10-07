// import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";

export const Routing = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<PublicLayout/>}>
                  <Route index element={<Login/>} />
                  <Route path="login" element={<Login/>} />
                  <Route path="registro" element={<Register/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}
