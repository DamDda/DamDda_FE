import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../../assets/fresh-sale.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export function CarouselComponent() {
  const [images, setImages] = useState([]);

  const fetchImage = async () => {
    const response = await axios({
      method: "GET",
      url: "http://223.130.156.95/admins/carousels",
    })
      .then((response) => setImages(response.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      {images.length > 0 ? (
        <Carousel
          fade
          interval={4000}
          style={{ maxWidth: "70%", width: "1920px", height: "auto" }}
        >
          {images.map((url) => (
            <Carousel.Item>
              <img
                src={`http://223.130.156.95/${url}`}
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
          style={{ maxWidth: "70%", width: "1920px", height: "auto" }}
        >
          {/* interval={5000} 추가로 5초마다 자동 전환 */}

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
