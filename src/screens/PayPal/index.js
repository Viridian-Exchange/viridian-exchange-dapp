import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./UploadVariants.module.sass";
import Control from "../../components/Control";
import {PayPalButton} from "react-paypal-button-v2";
import Image from "../../components/Image";
import UniLogo from "./uni_logo_white.svg"

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Upload Item",
  },
];

const items = [
  {
    url: "https://app.uniswap.org/#/swap?outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7",
    buttonText: "Swap $ETH for $VEXT",
    image: "/images/content/swap_logos_colors.png",
    image2x: "/images/content/swap_logos_colors.png",
  },
  {
    url: "https://app.uniswap.org/#/swap?outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7",
    buttonText: "Swap any Crypto for $VEXT",
    image: "/images/content/swap_logos_colors_white.png",
    image2x: "/images/content/swap_logos_colors_white.png",
  },
];

// function WalletPage(props) {
//   const [paid, setPaid] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const [amount, setAmount] = useState(0);
//   const [error, setError] = useState(null);
//   const [updated, setUpdated] = useState(false);
//   const [withdrawed, setWithdrawed] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState(0);
//   const [paymentEmail, setPaymentEmail] = useState("");
//   const [withdrawalID, setWithdrawalID] = useState("");
//
//   let paypalRef = useRef();
//
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.paypal.com/sdk/js?client-id=Ae_imicG6gzMcACXPqrcXsz6RN6QB0oZH_3TgtRV24I9fMLPKBHlHEdBe7EOViIn1Bsu0F-AYEAxqrL4";
//     script.addEventListener("load", () => setLoaded(true));
//     document.body.appendChild(script);
//   }, []);
//
//   function handleAmountChange(event, maskedVal) {
//     setAmount(maskedVal);
//   }
//
//   async function handlePurchase() {
//     if (!updated) {
//       if (props.collection !== [] || props.collection) {
//         await HandleUpdateUser(props.setAuthUser, props.userID, props.username, (amount + props.wallet), props.collection);
//       }
//       else {
//         await HandleUpdateUser(props.setAuthUser, props.userID, props.username, (amount + props.wallet), []);
//       }
//       props.setReFetch(true);
//       setUpdated(true);
//     }
//   }
//
//   function handleWithdrawAmount(event, val) {
//     setWithdrawAmount(val)
//   }
//
//   return (
//   );
// }

const Upload = (props) => {
  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h1", styles.title)}>Buy $VEXT</h1>
            <h1 className={cn("h3", styles.title)}>On Uniswap</h1>
            {/*<div><img src={UniLogo} /> <a href="https://app.uniswap.org/#/swap?outputCurrency=0xeAABfaf18b60fEcc299631c77E2FBB03507cfF99" rel="noreferrer">*/}
            {/*  app.uniswap.org*/}
            {/*</a></div>*/}
            <div className={styles.list}>
              {items.map((x, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.preview}>
                      <img srcSet={`${x.image2x} 2x`} src={x.image} alt="Upload" />
                    </div>
                    <Link className={cn("button-stroke", styles.button)} to={x.url}>
                      {x.buttonText}
                    </Link>
                  </div>
              ))}
            </div>
            <h1 className={cn("h3", styles.title)}>With USD</h1>
            <div className={styles.info}>
              Use <span>PayPal</span> to purchase <span>$VEXT</span> tokens with <span>USD</span>
            </div>
          </div>
          {/*<PayPalButton*/}
          {/*    createOrder={(data, actions) => {*/}
          {/*      return actions.order.create({*/}
          {/*        purchase_units: [{*/}
          {/*          amount: {*/}
          {/*            currency_code: "USD",*/}
          {/*            value: 10 //amount*/}
          {/*          }*/}
          {/*        }],*/}
          {/*        application_context: {*/}
          {/*          shipping_preference: "NO_SHIPPING"*/}
          {/*        }*/}
          {/*      });*/}
          {/*    }}*/}
          {/*    onApprove={(data, actions) => {*/}
          {/*      // Capture the funds from the transaction*/}
          {/*      return actions.order.capture().then(function(details) {*/}
          {/*        // Show a success message to your buyer*/}
          {/*        alert("Transaction completed by " + details.payer.name.given_name);*/}

          {/*        // OPTIONAL: Call your server to save the transaction*/}
          {/*        return fetch("/paypal-transaction-complete", {*/}
          {/*          method: "post",*/}
          {/*          body: JSON.stringify({*/}
          {/*            orderID: data.orderID*/}
          {/*          })*/}
          {/*        });*/}
          {/*      });*/}
          {/*    }}*/}
          {/*/>*/}
          <a
              href={"https://buy.ramp.network/?userAddress=" + props.account}
              target="_blank"
          >
            Buy Crypto for wallet {props.account} with USD
          </a>
          <div className={styles.note}>
            There may not be enough $VEXT for your order depending on the size, try again later when our stores are restored or trade on Uniswap in the meantime.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
