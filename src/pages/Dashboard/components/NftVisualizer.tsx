type NftVisualizerProps = {
  nft: any; //TODO cambiare tipo
};

export const NftVisualizer = ({ nft }: NftVisualizerProps) => {
  return (
    <div className='card card-nft'>
      <div className='card-header p-0 mx-3 mt-3 position-relative z-index-1'>
        <div className='hover-img border-radius-lg'>
          <img
            src={nft.url}
            className='img-fluid border-radius-lg'
            alt={nft.name}
          />
        </div>
      </div>
      <div className='card-body py-3 d-flex justify-content-between'>
        <h6 className='m-0 font-weight-bold'>{nft.name}</h6>
        <h6 className='m-0 text-end'>{nft.identifier}</h6>
      </div>
      <input
        type='checkbox'
        className='form-control form-check-input m-2'
        id={'check-' + nft.identifier} //TODO aggiungere eventi
      />
    </div>
  );
};
