const OfferCard = ({ discount }: { discount: number }) => {
  return (
    <div className="offer_card">
      <span>Buy this product at {discount}% off</span>
    </div>
  );
};

export default OfferCard;
