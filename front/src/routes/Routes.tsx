import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignInPage }  from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { HomePage } from "../pages/HomePage";

export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route element={<SignInPage/>} path="/"/>
                <Route element={<SignUpPage/>} path="/signup"/>
                <Route element={<HomePage/>} path="/home"/>
            </Routes>
        </Router>
    )
}