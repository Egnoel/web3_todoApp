// lib/ethers.ts
import { ethers } from 'ethers';
import TodoListABI from './TodoListABI.json';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545';


export const getProvider = (): ethers.JsonRpcProvider | ethers.BrowserProvider => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(rpcUrl);
};

export const getContract = async (): Promise<ethers.Contract> => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, TodoListABI.abi, signer);
};
