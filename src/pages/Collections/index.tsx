import * as React from 'react';
import { Row } from 'react-bootstrap';
import FeaturedCard from 'components/common/FeaturedCard';

const Collections = () => {
  return (
    <div className='container-xl'>
      <Row>
        {Array.from({ length: 8 }).map((item, _idx) => (
          // <Col xs={12} lg={4} key={_idx}>
          <FeaturedCard key={_idx} />
          // </Col>
        ))}
      </Row>
    </div>
  );
};

export default Collections;
