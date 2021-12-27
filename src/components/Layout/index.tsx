import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <Navbar />
      <main className="d-flex flex-column flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
