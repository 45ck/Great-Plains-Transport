import { React, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../styles/Reviews.module.css'

// handles reviews using bootstraps carousel 

const Reviews = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" style={{ minHeight: "30rem" }}>
            <Carousel.Item >
                <div className={styles.container}>
                    <blockquote className={`${styles.blockquote}`}>
                    Great Plains Transport has been a lifesaver for our business. They are reliable, efficient, and very easy to work with. We highly recommend Great Plains Transport to any business in need of transportation services.

                        <cite> - Sarah Johnson, owner of Johnson Supply Company </cite>
                    </blockquote>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className={styles.container}>
                    <blockquote className={`${styles.blockquote}`}>
                    Great Plains Transport is a great partner for our business. They are always friendly and helpful, and they take great care to ensure that our goods are delivered on time and in perfect condition.
                        <cite> -Mike Thompson, CEO of Thompson Manufacturing </cite>
                    </blockquote>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className={styles.container}>
                    <blockquote className={`${styles.blockquote}`}>
                    We have been using Great Plains Transport for our transportation needs for the past year, and we couldn't be happier with the service we have received. The team at Great Plains Transport is always professional and reliable. We highly recommend Great Plains Transport to any business in need of high-quality transportation services.
                        <cite> - Samantha Rodriguez, logistics manager at Rodriguez Corporation </cite>
                    </blockquote>
                </div>
            </Carousel.Item>
        </Carousel>

    );
};

export default Reviews;