import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Discover/Discover.module.sass";

const Drops = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Reserve your table in the worlds first metaverse card show</p2>
                <h3 className={cn("h3", styles.title)}>Mint Viridian Pass</h3>
                <div style={{textAlign: 'center'}}>
                    <img style={{maxWidth: '40ex', marginTop: '-5ex'}} src='images/content/VE_Pass_POC.png'/>
                </div>
                <div style={{textAlign: 'center', marginTop: '5ex'}}>
                    <button
                        className={cn(styles.link, {
                            [styles.active]: true,
                        })}
                        onClick={() => {}}
                    >
                        MINT 💎
                    </button>
                </div>
                <div style={{textAlign: 'center', marginTop: '5ex'}}>
                    <ProgressBar barContainerClassName="barContainer"
                                 completedClassName="barCompleted"
                                 labelClassName="barLabel"
                                 completed={40} customLabel="30/500 Minted" />
                </div>
            </div>
        </div>
    </>
  );
}

export default Drops;
