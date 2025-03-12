import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import {useAuth } from 'react-oidc-context';
import AWS from 'aws-sdk';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Home from './Pages/Home';
import Portal from './Pages/Portal';
import Layout from './Layout/Layout';
import Footer from './Layout/Footer';
import AdminLayout from './Layout/AdminLayout';
import Personal from './Pages/Portal/Personal';
import Financial from './Pages/Portal/Financial';
import Loans from './Pages/Portal/Loans';
import Review from './Pages/Portal/Review';
import ClientList from './Pages/Admin/ClientList';
import SubmitButton from './Components/Button';
import {Row, Container} from 'react-bootstrap';
import SloganHeader from './Components/SloganHeader';
import HomeInfo from './Components/HomeInfo';
import GlobalVar from './Data/GlobalVar' 

const App = () => {
    const [clickedClient, setClientID] = useState();
    const auth = useAuth();
    const administrators = GlobalVar.administrators;
    
    AWS.config.region = GlobalVar.REGION;
    

    const signOutRedirect = () => {
        auth.removeUser()
        setClientID(null) 
        const clientId = GlobalVar.APP_CLIENT_ID;
        const logoutUri = GlobalVar.HOME_URL;
        const cognitoDomain = GlobalVar.COGNITO_DOMAIN;
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      };

    
    

    if (auth.isLoading){
        console.log("Looading...")
        return(<div>Loading...</div>)
    }

    if (auth.error){
        console.error(auth.error)
        return (<div>Encountering error... { auth.error.message}</div>)
    }

    if (auth.isAuthenticated && clickedClient !== auth.user?.profile['cognito:username']) {
        const ClientID = auth.user?.profile['sub']
        const userName = auth.user?.profile['cognito:username']
        
    }
    
    return (
        <div>
            <Row className='text-align-center'>
            {auth.isAuthenticated? (
                            <>
                            {administrators.includes(auth.user?.profile['cognito:username'].toLowerCase())? (
                                <div>
                                    <AdminLayout AdminID = {auth.user?.profile['sub']}/>
                                </div>
                            ):(
                                <div>  
                                    <Layout ClientID = {auth.user?.profile['sub']} firstName = {auth.user?.profile.given_name} lastName = {auth.user?.profile.family_name} />
                                </div> 
                             )}
            
                            <Router>
                                <Routes>
                                    <Route path="/" element = {<Home ClientID = {auth.user?.profile['sub']} subID = {auth.user?.profile.sub}/>} />
                                    <Route path="/Portal" element ={<Portal ClientID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                    <Route path="/Portal/Personal" element = {<Personal ClientID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                    <Route path="/Portal/Financial" element = {<Financial ClientID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                    <Route path="/Portal/Loans" element = {<Loans ClientID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                    <Route path="/Portal/Review" element = {<Review ClientID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                    <Route path="/Admin/ClientList" element = {<ClientList AdminID = {auth.user?.profile['sub']} userName = {auth.user?.profile['cognito:username']}/>} />
                                </Routes>
                            </Router>
                            <Container>
            
                                <Row className='m-2'>
                                    <SubmitButton onClick={signOutRedirect} text = 'Sign out' />
                                </Row>
            
                            </Container>
                        </> 
            ):(
                <Container>
                    <Layout />
                    <SloganHeader />

                    <Row width="70%" className='mx-auto text-center home-sign-in'>
                        <SubmitButton onClick={() => auth.signinRedirect()} text = 'Sign in' />
                    </Row>
                    <HomeInfo />
                </Container>
            )}
            </Row>
            <Container className = 'm-10'>
                <Footer />
            </Container>
            
        </div>
        
    );
};

export default App;
