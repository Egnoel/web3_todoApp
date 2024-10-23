// components/WalletConnect.tsx
'use client'
import { useState } from 'react';
import Web3 from 'web3';

interface WalletConnectProps {
  web3: Web3 |null;
}

export default function WalletConnect({ web3 }: WalletConnectProps) {
  const [account, setAccount] = useState<string | null>(null);


  async function requestAccounts() {
		if (web3 === null) {
			return;
		}

		// request accounts from MetaMask
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		document.getElementById('requestAccounts')?.remove();

		// get list of accounts
		const allAccounts = await web3.eth.getAccounts();
		// get the first account and populate placeholder
		setAccount(allAccounts[0]);
	}

  return (
    <div className="mb-4">
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button
          onClick={requestAccounts}
          className="p-2 bg-green-500 text-white rounded"
          type='button'
        >
          Conectar Carteira
        </button>
      )}
    </div>
  );
}
