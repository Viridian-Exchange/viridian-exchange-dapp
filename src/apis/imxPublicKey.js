import { Wallet } from '@ethersproject/wallet';
const privateKey = '0a9b19dfa2e9ac1ba277d080440894ac06f970704fd8249305928acbf5490d2c';

export const findPrivateKey = () =>
{
    console.log(new Wallet(privateKey).publicKey);
}