import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import Footer from "./Footer";
import Navbar from "./Navbar";
import routes, { routeNames } from "routes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <Navbar />
      <main className="d-flex flex-column flex-grow-1">
        <Dapp.Authenticate routes={routes} unlockRoute={routeNames.unlock}>
          {children}
        </Dapp.Authenticate>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
