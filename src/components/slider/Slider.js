import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./SliderData";
import { useEffect, useState } from "react";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  //console.log(slideLength); 4 appears in the console.

  const nextSlide =()=>{
    setCurrentSlide( currentSlide === slideLength -1? 0 : currentSlide +1)
    //this means if the current slide is the last slide, then the value should be returned to 0, which means the next slide should be the first slide in the array. And if the current slide is not the last slide in our array, then the next slide to appear when we click the button should be the slide immediately after the current slide.
  };
  const prevSlide =()=>{
    setCurrentSlide(currentSlide === 0 ? slideLength -1 : currentSlide -1)
    //if the current slide is the first slide in the array, then  when we click the button,the next slide to appear should be the last slide in our array.And if it is not, then the next slide should be the slide preceding the current slide.
  };

  let slideInterval;
  let intervalTime = 5000;

  useEffect(()=>{
  setCurrentSlide(0)
  },[]);


//   function auto(){
//     slideInterval = setInterval(nextSlide,intervalTime)
//   }

  useEffect(()=>{
    function auto(){
        slideInterval = setInterval(nextSlide,intervalTime)
      };
      auto()
    return ()=>{
        clearInterval(slideInterval)
    }
  },[currentSlide, slideInterval])


  return (
    <div className={"slider"}>
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div
            key={index} //5hrs:35m: index stands 4"0,1,2,3".Note:if u are having a list,wer you need 2 manipulate the data,then it will be wrong to use "index" You will have to give the data its own id property, key={slide.id}.Since we are not manipulating it, then index is ok here//
            className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  {/* <hr /> horizontal row */}
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
