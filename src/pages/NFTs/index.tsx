import * as React from 'react';
import { Row } from 'react-bootstrap';
import NFTCard from 'components/common/NFTCard';
import NfTsSidebar from './NfTsSidebar';

const NFTs = () => {
  return (
    <div className='container-xl'>
      <div className='my-3 nfts__container'>
        <div className='d-none d-md-block'>
          {/* sidebar */}
          <NfTsSidebar />
        </div>

        {/* content */}
        <div className='nftContent'>
          <Row>
            {Array.from({ length: 6 }).map((item, _idx) => (
              <NFTCard key={_idx} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NFTs;
