import { useState } from "react";
import server from "./server";
import signObj from "./utils/sign";
import getPublicKey from "./utils/getPublicKey";

function Transfer({ setBalance, privateKey }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        const tempData = {
            senderAddress: getPublicKey(privateKey),
            amount: parseInt(sendAmount),
            recipient,
        };

        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

        const signature = await signObj(tempData, privateKey);

        const finalDataToSend = {
            ...tempData,
            signature,
        };

        try {
            const { data } = await server.post("/send", finalDataToSend);
            console.log(data);
            setBalance(data.balance);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <span
                    style={{
                        fontSize: "0.8em",
                        display: "block",
                        marginBottom: "1em",
                        color: "#888",
                    }}
                >
                    Public Address of the wallet you want to transfer funds to
                </span>
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;
