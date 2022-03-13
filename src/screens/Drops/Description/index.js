import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Description.module.sass";
import Image from "../../../components/Image";
import RemoveSale from "../../../components/RemoveSale";
import Modal from "../../../components/Modal";

const Description = () => {

  return (

    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>Secured by Polygon</div>
          <h1 className={cn("h1", styles.title)}>
            Collect <span className='text-color-gold'>Physical.</span>
            Trade <span className='text-color-gold'>Digital.</span>
          </h1>
          <div className={styles.text}>
            The Premiere Marketplace for Physically-Backed NFTs
          </div>
          <div className={styles.btns}>
            <Link className={cn("button", styles.button)} to="/faq">
              How it works
            </Link>
            <Link className={cn("button-stroke", styles.button)} to="/search01">
              Discover more
            </Link>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/bitmap_2_cards.png"
              srcSetDark="/images/content/bitmap_2_cards.png"
              src="/images/content/bitmap_2_cards.png"
              srcDark="/images/content/bitmap_2_cards.png"
              alt="Cubes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
