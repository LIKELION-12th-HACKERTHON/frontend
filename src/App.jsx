import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import FormLogin from "./pages/formlogin.jsx";
import CustomerHome from "./customers/customerhome";
import Sellershop from "./sellers/sellershop.jsx";
import InitialSearch from "./customers/initialsearch.jsx";
import Searchpage from "./customers/searchpage.jsx";
import SellermainPage from "./sellers/sellermainpage.jsx";
import Mypage from "./components/mypage.jsx";
import Detailpage from "./customers/detailpage.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/customer' element={<CustomerHome />}>
					<Route index={true} element={<InitialSearch/>}/>
					<Route path='search/:place' element={<Searchpage/>}/>
				</Route>
				{/* <Route path='/seller' element={<SellerPage />} /> */}
				<Route path='/customer' element={<CustomerHome />} />
				<Route path='/seller' element={<SellermainPage />} />
				<Route path='/seller' element={<SellermainPage />} />
				<Route path='/sellershop' element={<Sellershop />} />
				<Route path='/mypage' element={<Mypage/>}/>
				<Route path='/detail/:id' element={<Detailpage/>}/>
			</Routes>
		</Router>
	);
}

export default App;
