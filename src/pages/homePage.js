// import React from 'react'
// import NavBar from '../components/NavBar'
// import HeroSection from '../components/HeroSection'

// const HomePage = () => {
//   return (
//     <div>
//       <HeroSection/>
//     </div>
//   )
// }

// export default HomePage

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection'; // Assuming the correct path

const HomePage = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch your JSON data here
        const response = await fetch('/product.json');
        const data = await response.json();
        setJsonData(data.products); // Adjust based on your JSON structure
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Other components or content in your HomePage */}
      <HeroSection jsonData={jsonData} />
    </div>
  );
};

export default HomePage;
