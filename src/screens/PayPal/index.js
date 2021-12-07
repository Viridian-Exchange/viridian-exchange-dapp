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
    url: "https://buy.moonpay.com/?currencyCode=eth_polygon&singleCurrencyMode=true",
    buttonText: "Swap any Crypto for $VEXT",
    image: "images/content/eth-circle-logo.png",
    image2x: "/images/content/swap_logos_colors_white.png",
  },
  {
    url: "https://buy.moonpay.com/?currencyCode=usdc_polygon&singleCurrencyMode=true",
    buttonText: "Swap $ETH for $VEXT",
    image: "images/content/usd-coin-usdc-logo.png",
    image2x: "/images/content/swap_logos_colors.png",
  }
];

const items1 = [
  {
    url: "https://www.dharma.io/?chainId=137&toTokenAddress=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    buttonText: "Swap any Crypto for $VEXT",
    image: "images/content/eth-circle-logo.png",
    image2x: "/images/content/swap_logos_colors_white.png",
  },
  {
    url: "https://www.dharma.io/?chainId=137&toTokenAddress=0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    buttonText: "Swap $ETH for $VEXT",
    image: "images/content/usd-coin-usdc-logo.png",
    image2x: "/images/content/swap_logos_colors.png",
  }
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
            <h1 className={cn("h1", styles.title)}>Buy Polygon Crypto with USD</h1>
            <h1 className={cn("h3", styles.title)}><img src='images/content/moonpay_logo.png' /></h1>
            {/*<div><img src={UniLogo} /> <a href="https://app.uniswap.org/#/swap?outputCurrency=0xeAABfaf18b60fEcc299631c77E2FBB03507cfF99" rel="noreferrer">*/}
            {/*  app.uniswap.org*/}
            {/*</a></div>*/}
            <div className={styles.list}>
              {items.map((x, index) => (
                  <a href={x.url} style={{marginRight: '5ex', cursor: 'pointer'}}>
                    <img src={x.image} style={{maxWidth: '100px'}}/>
                  </a>
              ))}
            </div>

            <h1 className={cn("h3", styles.title)}><img style={{maxWidth: '120px', marginRight: '20px'}} src='images/content/dharma_logo_no_shadow.png' /><img style={{minWidth: '80px'}} src='images/content/dharma_logo_text_inverted.png' /></h1>
            <div className={styles.list}>
              {items1.map((x, index) => (
                  <a href={x.url} style={{marginRight: '5ex', cursor: 'pointer'}}>
                    <img src={x.image} style={{maxWidth: '100px'}}/>
                  </a>
              ))}
            </div>
            <h1 className={cn("h1", styles.title)}>Sell Polygon Crypto for USD</h1>
            <h1 className={cn("h3", styles.title)}><img style={{maxWidth: '120px', marginRight: '20px'}} src='images/content/dharma_logo_no_shadow.png' /><img style={{minWidth: '80px'}} src='images/content/dharma_logo_text_inverted.png' /></h1>
            <div className={styles.list}>
              {items1.map((x, index) => (
                  <a href={x.url} style={{marginRight: '5ex', cursor: 'pointer'}}>
                    <img src={x.image} style={{maxWidth: '100px'}}/>
                  </a>
              ))}
            </div>
            <div className={styles.info}>
              Use <span>Ramp</span> to purchase <span>Crypto</span> tokens with <span>USD</span> to convert to <span>$VEXT</span>
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
          {/*<a*/}
          {/*    href={"https://buy.ramp.network/?userAddress=" + props.account}*/}
          {/*    target="_blank" rel="noreferrer"*/}
          {/*>*/}
          {/*  Buy Crypto for wallet {props.account} with USD*/}
          {/*</a>*/}
          <div className={styles.note}>
            All companies listed are externals services and are not directly partnered with Viridian Exchange Inc.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
