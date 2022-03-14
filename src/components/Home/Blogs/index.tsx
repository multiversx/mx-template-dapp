import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Blogs = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <h2>Blog</h2>
        </div>
        <p>View all articles</p>
      </div>
      <Row xs={1} sm={2} md={3} className='g-4'>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Col key={idx}>
            <Card className='blog__card'>
              <Card.Img
                variant='top'
                src='https://images.ctfassets.net/9tp4nbs38ooy/38z56GX1nxpYMyyJvbpXOM/e80cb32adca7aebb88bcfebfa5b2023d/Blog-Header_Secondary_Market.png?fit=pad&h=420&q=90&w=630'
              />
              <Card.Body>
                <Card.Title>Artist Invite: Jimmy Edgar & Pilar Zeta</Card.Title>
                <Card.Text>
                  The collaborative artistic force connects the dots between
                  their individual practices.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <p>Published 1 February 2022</p>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blogs;
