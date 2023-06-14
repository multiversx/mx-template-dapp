import React from "react";
import {
	faChartSimple,
	faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar as BsNavbar, NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { dAppName, adminAddresses } from "config";
import { logout } from "helpers";
import { useGetIsLoggedIn, useGetAccount } from "hooks";
import { routeNames } from "routes";
import { ReactComponent as MultiversXLogo } from "../../assets/img/multiversx.svg";

export const Navbar = () => {
	const isLoggedIn = useGetIsLoggedIn();
	const { address } = useGetAccount();

	const handleLogout = () => {
		logout(`${window.location.origin}/unlock`);
	};

	return (
		<BsNavbar className="bg-white border-bottom px-4 py-3">
			<div className="container-fluid">
				<Link
					className="d-flex align-items-center navbar-brand mr-0"
					to={isLoggedIn ? routeNames.dashboard : routeNames.home}
				>
					<MultiversXLogo className="multiversx-logo" />
					<span className="dapp-name text-muted">{dAppName}</span>
				</Link>

				<Nav className="ml-auto">
					{isLoggedIn && (
						<>
							{adminAddresses.includes(address) && (
								<NavItem>
									<Link
										to={routeNames.adminSettings}
										className="btn btn-primary mr-2"
									>
										Admin Settings
									</Link>
								</NavItem>
							)}
							{/*
							<NavItem>
								<Link to={routeNames.home} className="nav-link">
									<FontAwesomeIcon
										icon={faChartSimple}
										className="text-muted"
									/>
								</Link>
							</NavItem>
							*/}
							<NavItem>
								<button
									className="btn btn-primary"
									onClick={handleLogout}
								>
									Logout
								</button>
							</NavItem>
						</>
					)}
				</Nav>
			</div>
		</BsNavbar>
	);
};
