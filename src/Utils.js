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

export function  parseAmountToVext(amount) {
    //BigNumber.config({ EXPONENTIAL_AT: 1 });
    amount = new BigNumber(amount);

    amount = amount.shiftedBy(18);
    //amount = amount.toNumber();

    alert("AMT: " + amount.toFixed());

    return amount.toFixed();
}

export function toFixedBetter(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}
