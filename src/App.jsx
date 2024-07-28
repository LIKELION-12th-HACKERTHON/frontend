import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import FormLogin from "./pages/formlogin.jsx";
import CustomerHome from "./customers/customerhome";
import SellermainPage from "./sellers/sellermainpage.jsx";
import Sellershop from "./sellers/sellershop.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/customer' element={<CustomerHome />} />
				<Route path='/seller' element={<SellermainPage />} />
				<Route path='/sellershop' element={<Sellershop />} />
			</Routes>
		</Router>
	);
}

export default App;
