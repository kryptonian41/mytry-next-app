import React from "react";
import relatedStyles from "./relatedProducts.module.css";
import ProductTile from "../../ProductTile";
import YouGlow from "assets/svgs/stickers/you-glow.svg";

const RelatedProducts = ({ relatedProducts, colorScheme }) => {
  return (
    <>
      <div className={relatedStyles.container}>
        <h2 style={{color: colorScheme.bgColor}}>you may also like</h2>
        <div className={relatedStyles.productsContainer}>
          {relatedProducts.map((relatedProduct) => (
              <ProductTile key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
      <div className={relatedStyles.dividerContainer}>
        <hr className={relatedStyles.divider} />
        <div className={relatedStyles.sticker}>
          <YouGlow />
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
