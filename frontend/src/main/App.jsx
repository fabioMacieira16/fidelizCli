import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';

import AuthProvider from '../contexts/auth';

import { BrowserRouter } from 'react-router-dom';
import Routes from './../routes';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <>
                    <ToastContainer autoClose={3000} />
                    <Routes />
                </>
            </BrowserRouter>
        </AuthProvider>
    )
}