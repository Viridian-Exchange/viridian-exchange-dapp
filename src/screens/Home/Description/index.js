import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Description.module.sass";
import Image from "../../../components/Image";

const Description = () => {
  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>The premier physically-backed nft exchange</div>
          <h1 className={cn("h1", styles.title)}>
            Bringing the <span className='text-color-gold'>physical</span> back to <span className='text-color-gold'>digital</span> collectibles.
          </h1>
          <div className={styles.text}>
            Send your cards in today
          </div>
          <div className={styles.btns}>
            <Link className={cn("button", styles.button)} to="/upload-variants">
              Create item
            </Link>
            <Link className={cn("button-stroke", styles.button)} to="/search01">
              Discover more
            </Link>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/zardxeth.png"
              srcSetDark="/images/content/zardxeth.png"
              src="/images/content/zardxeth.png"
              srcDark="/images/content/zardxeth.png"
              alt="Cubes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
