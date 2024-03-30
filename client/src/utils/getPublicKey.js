import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function getPublicKey(privateKey) {
    return toHex(secp.getPublicKey(privateKey));
}

export default getPublicKey;
