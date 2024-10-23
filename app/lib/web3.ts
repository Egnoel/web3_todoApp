import { Web3 } from 'web3';
import TodoListABI from './TodoListABI.json';

// Initialize Web3 with the injected provider (if available)
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545';
const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const web3 = new Web3(rpcUrl);

const contract = new web3.eth.Contract(TodoListABI.abi, address);

export interface Task {
    id: number;
    content: string;
    completed: boolean;
  }
// Get all tasks from the smart contract

export async function getAllTasks() {
  const taskCount: number = parseInt(await contract.methods.taskCount().call(), 10);
  const tasks: Task[] = [];

  for (let i = 1; i <= taskCount; i++) {
    const task: Task = await contract.methods.tasks(i).call();
    tasks.push(task);
  }

  return tasks;
}

// Add a new task to the smart contract

export async function addTask(content: string) {
  const account = await getAccount();
  await contract.methods.createTask(content).send({ from: account });
}

// Update a task's completion status in the smart contract

export async function toggleCompleted(taskId: number) {
  const account = await getAccount();
  await contract.methods.toggleCompleted(taskId).send({ from: account });
}



// Get the connected account

export async function getAccount(): Promise<string> {
        // use the injected Ethereum provider to initialize Web3.js
        await window.ethereum.request({ method: 'eth_requestAccounts' });
		document.getElementById('requestAccounts')?.remove();

		// get list of accounts
		const allAccounts = await web3.eth.getAccounts();
        return allAccounts[0];
        // check if Ethereum provider comes from MetaMask

}



