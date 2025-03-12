// This is the home page of the Iska Mortgage site. 
// Author: Rivka Markowitz
// Last updated: Feb 2025

import {React} from "react";
import SloganHeader from "../Components/SloganHeader";
import HomeInfo from "../Components/HomeInfo";

const Home = (props) => {
    return (
        <>
            <SloganHeader />
            <HomeInfo />
        </>
    );
}

export default Home;
