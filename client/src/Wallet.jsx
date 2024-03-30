import server from "./server";
import getPublicKey from "./utils/getPublicKey";

function Wallet({ privateKey, setPrivateKey, balance, setBalance }) {
    async function onChangePrivate(evt) {
        const privateKey = evt.target.value;
        setPrivateKey(privateKey);

        if (!privateKey) {
            setBalance(0);
            return;
        }

        const publicKey = getPublicKey(privateKey);
        const {
            data: { balance },
        } = await server.get(`/balance/${publicKey}`);
        setBalance(balance);
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Private Key
                <br />
                <span
                    style={{
                        fontSize: "0.8em",
                        color: "red",
                        marginBottom: "10px",
                    }}
                >
                    This will never be sent to the server
                </span>
                <input
                    placeholder="Enter your private key"
                    value={privateKey}
                    onChange={onChangePrivate}
                ></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
