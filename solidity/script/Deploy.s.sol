// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TodoList.sol";

contract DeployTodoList is Script {
    function run() external returns (TodoList) {
        vm.startBroadcast();
        TodoList todoList = new TodoList();
        vm.stopBroadcast();
        return todoList;
    }
}
