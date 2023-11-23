import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CartProvider } from '../context/CartContext';
import HomePage from '../pages/homePage'
// import CheckoutPage from '../pages/checkoutPage'
import NavBar from './NavBar'
import ItemsNav from './ProductsNav'
import HeroSection from './HeroSection'
import WomenPage from '../pages/womenPage'
import MenPage from '../pages/MenPage'
import ProductDetails from './ProductDetails'
import WomenProducts from './WomenProducts'
import MenProducts from './MenProducts'
import CheckOut from './CheckOut';
import LikedItems from './LikedItems';
import { SaveProvider } from '../context/SaveContext';

const Container = () => {
    const [jsonData, setJsonData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/product.json')
                setJsonData(response.data)
            } catch (error) {
                console.error('Error fetching JSON data:', error)
            }
        }

        fetchData()
    }, [])

    return (
      <CartProvider>
        <SaveProvider>
        <BrowserRouter>
            <div>
                <NavBar />
                <ItemsNav />
                {/* <HeroSection /> */}
                <Routes>
                    <Route path="/" element={<HomePage  jsonData={jsonData}/>} />
                    {/* <Route path="/women" element={<WomenPage />} /> */}
                    {/* <Route path="/women" element={<WomenPage />} /> */}
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route
                        path="/productdetails/:id"
                        element={<ProductDetails jsonData={jsonData} />}
                    />
                    <Route
                        path="/men"
                        element={<MenProducts jsonData={jsonData} />}
                    />
                    <Route
                        path="/women"
                        element={<WomenProducts jsonData={jsonData} />}
                    />
                     <Route
                        path="/saved"
                        element={<LikedItems jsonData={jsonData} />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
        </SaveProvider>
        </CartProvider>
    )
}

export default Container
