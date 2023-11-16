// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
// import HomePage from './pages/homePage'
// import ChairPage from './pages/chairPage'
// import CheckoutPage from './pages/checkoutPage'
// import NavBar from './components/NavBar'

// function App() {
//     return (
//       <div>
//         <NavBar/>
//         <BrowserRouter>
//             <Routes>
//             <Route path="/" element ={<HomePage />} />
//             <Route path="/chair" element ={<ChairPage />} />
//             <Route path="/checkout" element ={<CheckoutPage />} />

//             </Routes>
//         </BrowserRouter>
//         </div>
//     )
// }

// export default App

import './App.css'
import Container from './components/Container'
// import { CartProvider } from '../context/CartContext';


function App() {
    return (

        <div>
            <Container />
        </div>
    )
}

export default App
