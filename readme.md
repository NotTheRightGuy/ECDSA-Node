# ECDSA Node

This is a simple implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA) in JavaScript. It is based on the [SEC 1: Elliptic Curve Cryptography](http://www.secg.org/sec1-v2.pdf) document. These algorithms are the backbone of cryptocurrencies like Bitcoin and Ethereum.

## Hashing and Elliptic Curve

For hashing, we use `keccak256`, which is the hashing algorithm used in Ethereum. For elliptic curve operations, we use the `secp256k1` curve, which is the curve used in Bitcoin.

## Libraries Used

1. `ethereum-cryptography` (_@noble/secp256k1 completely breaks the code in the browser, so I had to use `ethereum-cryptography` instead._)

## Major Flaws

1. **Asking for the Private Key**: In this implementation, we ask for the private key on the client-side. However, in real-world applications, we don't ask for the private key. It is usually stored securely on the client-side. Even though we are asking for the private key, it never leaves the client-side, and only the public key is sent to the server.

## Testing the Code

In the `server/index.js` file, you will find sample addresses. To test the code, follow these steps:

1. Generate a few public/private key pairs.
2. Add the public keys to the `addresses` array in `server/index.js`.
3. To carry out a transaction, you need to sign the transaction with the private key and send the signed transaction to the server.
4. The server will verify the signature, and if it is correct, it will carry out the transaction.

## Additional Information

**Importance of ECDSA**:
The Elliptic Curve Digital Signature Algorithm (ECDSA) is a widely used cryptographic algorithm for digital signatures. It is based on the algebraic structure of elliptic curves over finite fields and provides a secure and efficient way to authenticate and verify the integrity of digital data.

ECDSA is particularly important in the realm of cryptocurrencies like Bitcoin and Ethereum because it plays a crucial role in securing transactions and ensuring the authenticity of data on the blockchain.

Equation for the Elliptic Curve in secp256k1 used in this project, here p is a prime number: `y^2 = x^3 + 7mod(p)`

**Private and Public Keys**:
In ECDSA, each user has a private key, which is a randomly generated secret number, and a corresponding public key, which is derived mathematically from the private key. The private key is used to create digital signatures, while the public key is used to verify those signatures.

**Digital Signatures**:
Digital signatures are created by applying the ECDSA algorithm to the data being signed (e.g., a transaction) using the private key. The resulting signature can be verified using the corresponding public key, ensuring that the data originated from the owner of the private key and hasn't been tampered with.

**Security and Cryptographic Strength**:
ECDSA relies on the computational complexity of the elliptic curve discrete logarithm problem, which is believed to be extremely difficult to solve for large key sizes. This mathematical complexity provides a high level of security and cryptographic strength, making ECDSA a widely trusted algorithm for secure communications and transactions.

**Applications Beyond Cryptocurrencies**:
While ECDSA is widely used in cryptocurrencies, its applications extend beyond that domain. It is also employed in various other areas, such as secure internet communications (e.g., SSL/TLS), software distribution, and code signing.

Please note that in real-world applications, secure key management and handling are of utmost importance to maintain the integrity and security of the cryptographic systems.
