import React, { useState, useEffect } from 'react'
import { ethers } from ethers;
import { contractAddress, contractABI } from './constants';

const App = () => {
  const [contractIns, setContractIns] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectContract = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error("Please install Metamask");
          return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddess, contrcatABI, signer);
        setContractIns(contract);
      }
      catch (err) {
        console.log(err);
      }
    }
    connectContract();
  }, [])

  return (
    <>

    </>
  )
}

export default App