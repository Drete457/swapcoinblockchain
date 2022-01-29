import { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

 return transactionContract;
}

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount') || 0);
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTranssactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No Accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }

  }

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionsCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        }]
      })

      const transactionsHash =  await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionsHash.hash}`);
      await transactionsHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionsHash.hash}`);

      const transactionCount = await transactionContract.getTransactionsCount();

      settransactionCount(transactionCount.toNumber());
      setFormData({ addressTo: "", amount: "", keyword: "", message: "" });

      window.reload();

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactionCount, connectWallet, transactions, currentAccount, formData, handleChange, sendTransaction, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
}
