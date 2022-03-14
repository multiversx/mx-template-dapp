import * as React from 'react';
import { Row } from 'react-bootstrap';
import Featured from 'components/Card/FeaturedCard';

const Collections = () => {
  return (
    <div className='container-xl'>
      <Row xs={1} sm={2} md={3} xxl={4} className='g-4'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Featured key={idx} />
        ))}
      </Row>
    </div>
  );
};

export default Collections;
