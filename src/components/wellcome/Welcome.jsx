import { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { TransactionContext } from "../../context/TransactionContext";
import { Loader, Input } from "..";
import Card from "./Card";
import Features from "./Features";
import HandleButton from "./HandleButton";


const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Welcome = () => {
  const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) {
      return alert("Please fill all the fields");
    }

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5x1 text-white text-gradient py-1">Send Crypto <br /> across the world</h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Explore the crypto world. Buy  and sell cryptocurrencies easily on SwipeCoin Application</p>
          {!currentAccount &&
            <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">Connect Wallet</p>
            </button>
          }
          <Features commonStyles={commonStyles} />
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <Card currentAccount={currentAccount} />
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" value={formData.addressTo} handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" value={formData.amount} handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={formData.keyword} handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" value={formData.message} handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ?
              (<Loader />)
              :
              (
                <HandleButton handleSubmit={handleSubmit} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
