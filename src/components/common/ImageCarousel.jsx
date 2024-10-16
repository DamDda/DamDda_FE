import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../../assets/fresh-sale.png";
import "bootstrap/dist/css/bootstrap.min.css";

export function ImageCarousel({images, style}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px 0",
        
      }}
    >
      {images.length > 0 ? (
        <Carousel
          fade
          interval={4000}
          style={style}
        >
          {images.map((url) => (
            <Carousel.Item>
              <img
                src={url}
                alt={url}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: 30,
                }}
              />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Carousel
          fade
          interval={4000}
          style={style}
        >

          <Carousel.Item>
            <img
              src={ExampleCarouselImage}
              alt="First slide"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: 30,
              }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={ExampleCarouselImage}
              alt="Second slide"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: 30,
              }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={ExampleCarouselImage}
              alt="Third slide"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: 30,
              }}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}
