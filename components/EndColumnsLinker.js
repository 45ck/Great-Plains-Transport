import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from '../styles/EndColumnLinker.module.css'

export const EndColumnsLinker = (props) => {
  const router = useRouter();

  // display objects in props as buttons in the shape of columns
  // there can be 2, 3 or 4 columns

  return (
    <Row >
      <h2 className='display-1'> {props.title} </h2>
      <Row>
        {
          props.data.map((item, index) => {
            return <Col key={index} className={styles.moreInfoCol} onClick={() => router.push(item.route)}>
              <div>
                <h3><Link href={item.route}>{item.text}</Link></h3>
                <Image loading="lazy" src={item.image} alt={item.alt} />
              </div>
            </Col>
          })
        }
      </Row>
    </Row>
  );
};