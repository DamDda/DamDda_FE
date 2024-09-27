// src/components/MainContent.jsx
import React from 'react';
import { Footer } from '../../layout/Footer';
import NewSection from './NewSection'; // NewsSection 대신 NewSection으로 변경
import { Category } from '../../layout/Category';
import { Header } from '../../layout/Header';
import { CarouselComponent } from './Carousel';
import {CollaborationSection} from './Collaboration'
import {ServiceCards} from './ServiceCards'

// import { Payment } from '../support/payment';
// import Banner1 from '../../assets/banner-1.png'
import Banner2 from '../../assets/Banner2.png'
import {ProductRecommendations} from '../../layout/Product';
import { SearchBar } from '../../layout/SearchBar';
import "./MainBanner.css";
import "../../styles/style.css"
function Main() {
  return (
    <>
      <Header />
      <CarouselComponent />
      <Category />
      <SearchBar />
      <ServiceCards></ServiceCards>



      
      <ProductRecommendations></ProductRecommendations>
      <ProductRecommendations></ProductRecommendations>

      <div className="banner-container2">
            <img
              src={Banner2}
              alt="Banner"
              className="banner-image2"
            />
          </div>
      <ProductRecommendations></ProductRecommendations>
      <ProductRecommendations></ProductRecommendations>

      <ProductRecommendations></ProductRecommendations>
      <NewSection />

      <CollaborationSection></CollaborationSection>
     
      
      <Footer />
      {/* <Payment /> */}
    </>
  );
}

export default Main;
