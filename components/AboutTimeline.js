import React from 'react';
import styles from '../styles/Timeline.module.css'

// a date / period in the timeline 

export const TimelinePart = (props) => {

    // get a reference to the timetable in the virtual DOM

    const domRef = React.useRef();
    
    const [isVisible, setVisible] = React.useState(false);

    // when user has at least 90% of the element in there view 
    // it will remove the blur from the part.
  
    React.useEffect(() => {

      const observer = new IntersectionObserver(entries => {    

        if (entries[0].isIntersecting && !isVisible)
          setVisible(true);
        else if (!entries[0].isIntersecting)
          setVisible(false);

      }, {threshold: props.threshold != null ? props.threshold : 0.9});

      observer.observe(domRef.current);
      
      return () => observer.disconnect();
    }, []);
  
    return (
      <div ref={domRef} className={`${styles.timelineContainer} 
        ${props.direction == "right" ? styles.timelineRight : styles.timelineLeft} ${props.isFirst ? styles.timelineFirst : null}
        ${props.closer ? styles.timelineClose : null} ${isVisible ? styles.timelineHighlightedContainer : styles.timelineBackgroundContainer}`} > 
          <div className={`${styles.timelineContent} ${isVisible ? styles.timelineHighlighted : styles.timelineBackground}`}>
            {props.children}
          </div>
      </div>

    );
  };

  // container for the parts.

  export const Timeline = (props) => {
    return (
      <div className={styles.timeline}> 
        {props.children}
      </div>
    )
  };