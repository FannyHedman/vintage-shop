import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/homePage'
import ChairPage from '../pages/chairPage'
import CheckoutPage from '../pages/checkoutPage'
import LampPage from '../pages/lampPage'
import NavBar from './NavBar'
import ItemsNav from './ItemsNav'
import HeroSection from './HeroSection'
const Container = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <ItemsNav />
                <HeroSection />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chair" element={<ChairPage />} />
                    <Route path="/lamps" element={<LampPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Container
