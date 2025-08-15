"use client";

import Marquee from "@/app/components/Marquee";
import Image from "next/image";
import { useState } from "react";
import img1 from "../assets/1.jpg";
import img10 from "../assets/10.jpg";
import img11 from "../assets/11.jpg";
import img12 from "../assets/12.jpg";
import img13 from "../assets/13.jpg";
import img14 from "../assets/14.jpg";
import img15 from "../assets/15.jpg";
import img16 from "../assets/16.jpg";
import img17 from "../assets/17.jpg";
import img2 from "../assets/2.png";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.png";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";

import cImg1 from "../assets/c-1.jpg";
import cImg10 from "../assets/c-10.jpg";
import cImg2 from "../assets/c-2.jpg";
import cImg3 from "../assets/c-3.jpg";
import cImg4 from "../assets/c-4.jpg";
import cImg5 from "../assets/c-5.jpg";
import cImg6 from "../assets/c-6.jpg";
import cImg7 from "../assets/c-7.jpg";
import cImg8 from "../assets/c-8.jpg";
import cImg9 from "../assets/c-9.jpg";
import ImageViewer from "./ImageViewer";

const cImages = [
  {
    image: cImg1,
  },
  {
    image: cImg2,
  },
  {
    image: cImg3,
  },
  {
    image: cImg4,
  },
  {
    image: cImg5,
  },
  {
    image: cImg6,
  },
  {
    image: cImg7,
  },
  {
    image: cImg8,
  },
  {
    image: cImg9,
  },
  {
    image: cImg10,
  },
];

const images = [
  {
    image: img1,
  },
  {
    image: img2,
  },
  {
    image: img3,
  },
  {
    image: img4,
  },
  {
    image: img5,
  },
  {
    image: img6,
  },
  {
    image: img7,
  },
  {
    image: img8,
  },
  {
    image: img9,
  },
  {
    image: img10,
  },
  {
    image: img11,
  },
  {
    image: img12,
  },
  {
    image: img13,
  },
  {
    image: img14,
  },
  {
    image: img15,
  },
  {
    image: img16,
  },
  {
    image: img17,
  },
];

const Photos = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="w-full relative flex-1">
      <div
        className="absolute h-full w-[200%] -left-1/4 justify-center items-center flex flex-col space-y-1 perspective-near"
        style={{
          transform: "rotate(12deg)",
        }}
      >
        <Marquee
          className="w-full"
          baseVelocity={3}
          repeat={3}
          draggable={false}
          slowDownFactor={0.2}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          direction="left"
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="h-[12rem] w-[9rem] md:h-[16rem] md:w-[12rem] p-1"
            >
              <Image
                src={item.image}
                alt={`Image ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                placeholder="blur"
                width={200}
                height={200}
                className="rounded-lg"
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </Marquee>
        <Marquee
          className="w-full"
          baseVelocity={3}
          repeat={3}
          draggable={false}
          slowDownFactor={0.2}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          direction="right"
        >
          {cImages.map((item, index) => (
            <div
              key={index}
              className="h-[12rem] w-[9rem] md:h-[16rem] md:w-[12rem] p-1"
            >
              <Image
                src={item.image}
                alt={`Image ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                placeholder="blur"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          ))}
        </Marquee>
        <Marquee
          className="w-full"
          baseVelocity={3}
          repeat={3}
          draggable={false}
          slowDownFactor={0.2}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          direction="right"
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="h-[12rem] w-[9rem] md:h-[16rem] md:w-[12rem] p-1"
            >
              <Image
                src={item.image}
                alt={`Image ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                placeholder="blur"
                width={200}
                height={200}
                className="rounded-lg"
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </Marquee>
      </div>
      {selectedImage !== null && (
        <ImageViewer
          initialIndex={selectedImage}
          images={images}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Photos;
