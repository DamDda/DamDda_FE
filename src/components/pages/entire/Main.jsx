// src/components/MainContent.jsx
import {React, useState} from 'react';
import { Footer } from '../../layout/Footer';
// import NewSection from './NewSection'; // NewsSection 대신 NewSection으로 변경
import { Category } from '../../layout/Category';
import { Header } from '../../layout/Header';
import { useLocation } from 'react-router-dom';
// import { CarouselComponent } from './Carousel';
// import {CollaborationSection} from './Collaboration'
// import {ServiceCards} from './ServiceCards'

// import { Payment } from '../support/payment';
// import Banner1 from '../../assets/banner-1.png'
// import Banner2 from '../../assets/Banner2.png'
import { Box } from '@mui/material';
import {ProductRecommendations} from './Product';
// import { SearchBar } from '../../layout/SearchBar';
import "./MainBanner.css";
import "../../styles/style.css"
import "../../../App.css"

function Main() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [cartegory, setCartegory] = useState(query.get('category') || '전체');
  // const [cartegory, setCartegory] = useState('전체');
  const [search, setSearch] = useState(query.get('search') || "");
  
  return (
    <>
      <Header search={search} setSearch={setSearch}/>
      <Box sx={{ marginTop: 4 }}> {/* marginTop으로 여백 조절 */}
      <Category setCartegory={setCartegory}/>
      </Box>      
      <ProductRecommendations cartegory={cartegory} search={search}></ProductRecommendations>
 
      <Footer />
    </>
  );
}

export default Main;
