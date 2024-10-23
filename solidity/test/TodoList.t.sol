// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TodoList.sol";

contract TodoListTest is Test {
    TodoList todoList;

    function setUp() public {
        todoList = new TodoList();
    }

    function testInitialTaskCount() public view {
        assertEq(todoList.taskCount(), 1);
    }

    function testCreateTask() public {
        todoList.createTask("Nova Tarefa");
        assertEq(todoList.taskCount(), 2);
        (uint id, string memory content, bool completed) = todoList.tasks(2);
        assertEq(id, 2);
        assertEq(content, "Nova Tarefa");
        assertEq(completed, false);
    }

    function testToggleCompleted() public {
        todoList.toggleCompleted(1);
        (, , bool completed) = todoList.tasks(1);
        assertEq(completed, true);
    }
}
