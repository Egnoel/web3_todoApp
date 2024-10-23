// pages/index.tsx
'use client'
import { useEffect, useState } from 'react';
//import { ethers } from 'ethers';
import { Web3 } from 'web3';
import WalletConnect from '@/components/WalletConnect';
import { addTask, getAllTasks, Task, toggleCompleted } from '@/lib/web3';



export default function Home() {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [newTask, setNewTask] = useState('');
  const [web3, setWeb3] = useState<Web3 | null>(null);


  useEffect(() => {
		// ensure that there is an injected the Ethereum provider
		if (window.ethereum) {
			// use the injected Ethereum provider to initialize Web3.js
			setWeb3(new Web3(window.ethereum));
			// check if Ethereum provider comes from MetaMask
    }
	}, []);


  const loadTasks = async()=>{
    const tasks:Task[]= await getAllTasks()
       setTasks(tasks);
   }

  useEffect(() => {
    loadTasks()
  }, []);

  const addNewTask = async () => {
    if (!newTask && !web3) return;
    try {
      console.log('Adicionando nova tarefa:', newTask);
      await addTask(newTask);

      console.log('Transação confirmada');
      setNewTask('');
      loadTasks();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const toggleTask = async (id: number) => {
    if (!web3) return;
    try {
      console.log('Alternando tarefa ID:', id);
      await toggleCompleted(id);
      console.log('Transação confirmada');
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } catch (error) {
      console.error('Erro ao alternar status da tarefa:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Web3 To-Do List</h1>
      <WalletConnect web3={web3} />
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={addNewTask}
          className="p-2 bg-blue-500 text-white rounded-r"
          type='button'
        >
          Adicionar
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <span
              className={`cursor-pointer ${task.completed ? 'line-through' : 'none'}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
