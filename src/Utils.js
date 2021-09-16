import BigNumber from "bignumber.js";

export function parseVextAmount(vextAmount) {
    vextAmount = new BigNumber(vextAmount);

    vextAmount = vextAmount.shiftedBy(-18);
    vextAmount = vextAmount.toNumber();
    //alert(vextBalance);
    //alert(vextBalance < 1000000.0);
    if (10000 < vextAmount && vextAmount < 1000000.0) {
        return (vextAmount / 1000).toFixed(2) + "K"
    }
    else if (vextAmount > 1000000.0) {
        //alert("DIV: " + vextBalance / 1000000)
        return (vextAmount / 1000000).toFixed(2) + "M"
    }
    else {
        return vextAmount.toFixed(2);
    }
}

export function parseAmountToVext(amount) {
    amount = new BigNumber(amount);

    amount = amount.shiftedBy(18);
    amount = amount.toNumber();

    alert("AMT: " + amount);

    return amount.toString();
}
