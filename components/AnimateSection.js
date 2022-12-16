import React from 'react';

// when the section is seen by the user than it will add a class 
// to the section which allows you to animate  the element. 

// the prop threshold is the percentage (as decimal) of the 
// element that needs to be visible to the user before
// adding the class / playing the animation. 

const AnimateInSection = (props) => {
    const domRef = React.useRef();

    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        // In your case there's only one element to observe:     
        if (entries[0].isIntersecting) {

          domRef.current.classList.add(props.classesToAdd);
          domRef.current.style.opacity = 1;

          // No need to keep observing

          observer.unobserve(domRef.current);
        } 
      }, {
        threshold: props.threshold != null ? props.threshold : 0.25
      });  
      
      observer.observe(domRef.current);
      
      return () => observer.disconnect();
    }, []);
          
    
    return (<div ref={ domRef } style={{opacity: "0", position: "relative"}}
      >{ (props.children != null) ? props.children : "" }</div>);
  };

  export default AnimateInSection;