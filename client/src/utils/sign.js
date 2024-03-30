import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

async function signObj(ob, privateKey) {
    const bytes = utf8ToBytes(JSON.stringify(ob));
    const hash = keccak256(bytes);
    const signed = secp256k1.sign(hash, privateKey);
    return signed;
}

export default signObj;
