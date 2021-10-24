import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

const Preview = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.item, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {item.question}
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
            {item.answer}
        </div>
        <a className={cn("button-stroke button-small", styles.button)} href={item.learnMore}>
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Preview;
