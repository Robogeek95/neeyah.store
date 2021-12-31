import React, { Component } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import { CarouselData } from "carouselData";
import Image from 'next/image';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.paused === false) {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 3000);
  }

  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="mt-8">
        <div className="h-96 flex overflow-hidden relative">
          <div
            className="absolute shadow-lg left-5 bg-red-400 rounded-full hover:bg-red-600 focus:shadow-inner  p-2 text-3xl top-1/2 text-white cursor-pointer"
          >
            <AiOutlineLeft
              onClick={this.prevSlide}
              size={25}
            />
          </div>

          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {CarouselData.map((slide, index) => {
              return (
                <img
                  src={slide.image}
                  // layout="fill"
                  // objectFit="cover"
                  alt={`slide ${index}`}
                  key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block w-full h-auto object-cover rounded-lg"
                      : "hidden"
                  }
                  onMouseEnter={() => {
                    this.setState({ paused: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ paused: false });
                  }}
                />
              );
            })}
          </Swipe>

          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-4 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>

          <div
            className="absolute shadow-lg right-5 bg-red-400 rounded-full hover:bg-red-600 focus:shadow-inner  p-2 text-3xl top-1/2 text-white cursor-pointer"
          >
            <AiOutlineRight
              onClick={this.nextSlide}
              size={25}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;