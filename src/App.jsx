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
import Shopkeeper from "./sellers/seller_order/Shopkeeper.jsx";
import ReviewPage from "./sellers/seller_order/Shopkeeperpages/ReviewPage.jsx";
import CustomerProfile from "./customers/customerProfile.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/customer' element={<CustomerHome />}>
					<Route index={true} element={<InitialSearch />} />
					<Route path='search/:place' element={<Searchpage />} />
				</Route>
				<Route path='/customer' element={<CustomerHome />} />
				<Route path='/seller' element={<SellermainPage />} />
				<Route path='/seller' element={<SellermainPage />} />
				<Route path='/sellershop' element={<Sellershop />} />
				<Route path='/mypage' element={<Mypage />}>
					<Route index={true} element={<CustomerProfile/>}/>
					<Route path='profile' element={<CustomerProfile/>}/>
				</Route>
				<Route path='/shopkeeper' element={<Shopkeeper />} />
				<Route path='/detail/:id' element={<Detailpage />} />
				<Route path='/review/:id' element={<ReviewPage />} />
			</Routes>
		</Router>
	);
}

export default App;
