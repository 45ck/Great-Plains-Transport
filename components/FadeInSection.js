import React from 'react';

// this will fade the element in when the element
// is in the users viewport. 

// prop threshold is the percentage (as a decimal) that needs to
// be visible to the user before fading in.

// prop transition is the fade animation transition time (milliseconds)

// prop delay is the time it waits before running the fade-in animation (milliseconds)

const FadeInSection = (props) => {
    const domRef = React.useRef();
    
    const [isVisible, setVisible] = React.useState(false);
  
    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        // In your case there's only one element to observe:     
        if (entries[0].isIntersecting) {
        
          // Not possible to set it back to false like this:
          setVisible(true);
          
          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      }, {threshold: props.threshold != null ? props.threshold : 0.25});
      
      observer.observe(domRef.current);
      
      return () => observer.disconnect();
    }, []);
  
    return (<div ref={ domRef } 
      style={{  
        transition: `opacity ${(props.transition != null) ? props.transition : "600ms"} ease-out, transform ${(props.transition != null) ? props.transition : "600ms"} ease-out`,
        transitionDelay: (props.delay != null) ? props.delay : "0ms"
    }}
      className={`fade-in-section ${(isVisible ? ' fade-in-section-visible' : '')} `}>{ (props.children != null) ? props.children : "" }</div>);
  };

  export default FadeInSection;