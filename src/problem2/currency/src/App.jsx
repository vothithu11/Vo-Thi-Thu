import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState("");
  const [convert, setConvert] = useState("");
  const [sendValue, setSendValue] = useState();
  const [receiveValue, setReceiveValue] = useState();

  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://interview.switcheo.com/prices.json");
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    api();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !sendValue || !receiveValue) {
      toast.error("Please fill in all fields: amount, currency to send, and currency to receive.");
      return;
    }
    const fromPrice = data.find((price) => price.currency === sendValue);
    const toPrice = data.find((price) => price.currency === receiveValue);
    console.log(fromPrice, toPrice, receiveValue, "gffđgf");
    if (fromPrice && toPrice && amount) {
      setConvert(Math.floor((amount * fromPrice.price) / toPrice.price));
    }
  };

  return (
    <div className="relative bg-white">
      <div className="bg-gradient-to-r from-[#0A146E] to-[#040F44] h-[50vh] clip-path-custom absolute top-0 left-0 right-0 ">
        <div className="flex justify-center items-center gap-5 mt-6">
          <img
            src="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg"
            className="w-14 h-14"
            alt="Vite logo"
          />
          <div className="flex flex-col">
            <h1 className="text-center font-semibold leading-[52px] text-[40px] text-[#fff]">
              A currency swap form
            </h1>
            <p className="text-center text-[#d1d7e2] text-xl">
              to swap assets from one currency to another
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-center items-center h-[30vh] max-w-[1100px] z-10 relative top-40 bg-white mx-auto border rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className=""
        >
          <div className="flex gap-[180px] items-center justify-center text-[#0A146E] text-xl">
            <Item
              value={sendValue}
              setValue={setSendValue}
              setAmount={setAmount}
              data={data}
              label="Amount to send"
            >
               <div className="flex gap-2">
              <span>Enter:</span>
              <input
                id="input-amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[180px] h-[30px] border border-blue-900 rounded-lg text-center text-[#141e37] font-semibold"
              />
              </div>
            </Item>
            <div className="border rounded-full w-[50px] h-[45px] flex justify-center items-center">
              <FontAwesomeIcon icon={faRepeat} />
            </div>
            <Item
              value={receiveValue}
              setValue={setReceiveValue}
              setAmount={setAmount}
              data={data}
              label="Amount to receive"
            >
              <div className="flex gap-2">
              <span>Result:</span>
               <input
                id="input-amount"
                value={convert}
                disabled
                className="w-[180px] h-[30px] border bg-red-100 border-none rounded-lg text-center"
              />
              </div>
            </Item>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-lg bg-[#006ce0] w-max h-[48px] mx-auto text-white font-semibold text-base py-3 px-6 flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faCoins} />
            CONFIRM SWAP
          </button>
        </form>
      </div>
      <Toaster  position="top-center"/>
    </div>
  );
}

export default App;
