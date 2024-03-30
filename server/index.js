const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const balances = {
    "03916dd994be866becce34cc45159b322f2cf4e8056e279ba3e5e62537cbdedf20": 100,
    "02306991d39c27b8e6083ac2c9d9e883d75c79e1ae65ba686da14c88211418f304": 50,
    "039f4aa759bab842aaf796879d1f8bb7d7b165587d94b332d649cbe3b36abc784a": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    const { senderAddress, recipient, amount, signature } = req.body;

    setInitialBalance(senderAddress);
    setInitialBalance(recipient);

    const msgHash = keccak256(
        utf8ToBytes(JSON.stringify({ senderAddress, amount, recipient }))
    );

    const { r, s, recovery } = signature;
    const sig = new secp256k1.Signature(BigInt(r), BigInt(s), recovery);

    if (!secp256k1.verify(sig, msgHash, senderAddress)) {
        res.status(400).send({ message: "Invalid signature!" });
        return;
    }

    if (balances[senderAddress] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[senderAddress] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[senderAddress] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
