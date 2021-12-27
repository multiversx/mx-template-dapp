import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { Navbar as BsNavbar, NavItem, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { dAppName } from "config";
import { ReactComponent as ElrondLogo } from "./../../../assets/img/elrond.svg";
import { logout, getIsLoggedIn } from "@elrondnetwork/dapp-core";

const Navbar = () => {
  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const isLoggedIn = getIsLoggedIn();

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <Link
          className="d-flex align-items-center navbar-brand mr-0"
          to={isLoggedIn ? "/dashboard" : "/"}
        >
          <ElrondLogo className="elrond-logo" />
          <span className="dapp-name text-muted">{dAppName}</span>
        </Link>

        <Nav className="ml-auto">
          {isLoggedIn && (
            <NavItem>
              <a href="/" onClick={handleLogout}>
                Close
              </a>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
