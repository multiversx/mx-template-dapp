import React from 'react';
import { Button, Card, Col, Spinner } from 'react-bootstrap';

const NFTCard = ({ image }: { image: string; key: number }) => {
  return (
    <Col md='6' lg='4'>
      <Card className='card__root'>
        <div className='card__img'>
          <Card.Img variant='top' src={image} />
        </div>
        <div className='card__blank'></div>
        <Card.Body className='card__body'>
          <div className='card__body__img'>
            <img src={image} alt='...' />
          </div>
          <h3 className='text-dark my-2'>Sunshine</h3>
          <div className='card__body__details'>
            <img src={image} alt='...' />
            <p>Endless War</p>
          </div>
          <p className='mt-3 mb-0 current__bid__title'>Current Bid</p>
          <div className='live__show mb-3'>
            <p>0.40 ETH</p>
            <div>
              <Spinner
                animation='grow'
                size='sm'
                variant='light'
                className='NFTCard__detailsBidSpinner'
              />
              <p>LIVE</p>
              <p>11h</p>
            </div>
          </div>
          <Button variant='dark' className='card__btn'>
            Place Bid
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NFTCard;
