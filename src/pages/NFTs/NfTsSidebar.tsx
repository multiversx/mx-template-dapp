import React from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';

const NfTsSidebar = () => {
  return (
    <div className='nftSidebar'>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Price range</Accordion.Header>
          <Accordion.Body>
            <div className='input_wrap'>
              <div className='input'>
                <input
                  placeholder='0.00'
                  type='number'
                  className='form-control'
                />
                <div className='inputEnd'>ETH</div>
              </div>
              <div className='input'>
                <input
                  placeholder='0.00'
                  type='number'
                  className='form-control'
                />
                <div className='inputEnd'>ETH</div>
              </div>
            </div>
            <Button className='price__btn' variant='outline-dark'>
              Set Price
            </Button>
          </Accordion.Body>
        </Accordion.Item>
        {/*  */}
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Availability</Accordion.Header>
          <Accordion.Body>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Listed for Auction'
              />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Buy Now price set'
              />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Live Auction'
              />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Active Offer'
              />
              <p>6,050</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/*  */}
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Market</Accordion.Header>
          <Accordion.Body>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Primary'
              />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                label='Secondary'
              />
              <p>6,050</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/*  */}
        <Accordion.Item eventKey='3'>
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body>
            <div className='my-3 checkInput'>
              <Form.Check type='checkbox' id='default-checkbox' label='Image' />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check type='checkbox' id='default-checkbox' label='Video' />
              <p>6,050</p>
            </div>
            <div className='my-3 checkInput'>
              <Form.Check type='checkbox' id='default-checkbox' label='3D' />
              <p>6,050</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default NfTsSidebar;
