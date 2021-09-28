import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import { useLocation, useHistory } from "react-router-dom";
import Icon from "../Icon";

const SearchDropdown = ({ className, value, setValue, options, visible, setVisible }) => {
  //const [visible, setVisible] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const handleClick = (value) => {
    //setValue(value);
    //setVisible(false);
    if (value.isVNFT) {
      history.push("/item/vnft/" + value.id);
    }
    else if (value.isVNFT === false) {
      history.push("/item/pack/" + value.id);
    }
    else if (value.address) {
      history.push("/profile/" + value.address);
    }
    //history.push("/item/pack/1");
    alert(JSON.stringify(value));
  };

  return (
      <div>
      {(options.length > 0) && <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.body}>
          {options.map((x, index) => {
                  if (index < 10) {
                      return (
                          <div
                              className={cn(styles.option, {
                                  [styles.selectioned]: x.label === value,
                              })}
                              onClick={() => handleClick(x, index)}
                              key={index}
                          >
                            {x.image.includes('.mp4') ? <video autoPlay loop muted style={{maxWidth: '10ex', marginRight: '2ex'}}>
                                  <source src={x.image} type="video/mp4"/>
                                </video> :
                            <img src={x.image} alt={""} style={{maxWidth: '4ex', marginRight: '2ex'}}/>}
                            {x.label}
                          </div>);
                  }
              }
          )}
        </div>
      </div>}
      </div>
  );
};

export default SearchDropdown;
