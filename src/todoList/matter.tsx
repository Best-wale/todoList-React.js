import { useState, useEffect } from "react";
import "./index.css";

function Header() {
    return (
        <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                To-Do List
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize your tasks efficiently
            </p>
        </header>
    );
}

function AddTask({ tasks, setTasks }) {
    const [task, setTask] = useState("");

    const [dueDate, setDueDate] = useState("");

    const [priority, setPriority] = useState("medium");

    console.log(tasks);
    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim() === "") return; // Prevent adding empty tasks
        const newTask = {
            id: Date.now(),
            description: task,
            dueDate: dueDate || 'no due date',
            priority: priority,
        };
        setTasks([...tasks, newTask]);
        setTask("");
        setDueDate("");
        setPriority("medium");
    };

    return (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Add New Task
            </h2>
            <form onSubmit={handleAddTask} id="add-task-form" className="space-y-4">
                <div>
                    <label
                        htmlFor="task-input"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Task Description
                    </label>
                    <input
                        type="text"
                        id="task-input"
                        placeholder="What needs to be done?"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="due-date"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Due Date (Optional)
                        </label>
                        <input
                            type="date"
                            id="due-date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="priority"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    <i className="fas fa-plus mr-2"></i> Add Task
                </button>

            </form>
        </div>
    );
}

function Filter({ setSortBy, setFilterBy }) {
    return (
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => { setFilterBy("all") }}

                    id="filter-all"
                    className="px-3 py-1 rounded-md bg-primary text-white"
                >
                    All
                </button>
                <button
                    id="filter-active"
                    onClick={() => { setFilterBy("active") }}
                    className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Active
                </button>
                <button
                    id="filter-completed"
                    onClick={() => { setFilterBy("completed") }}
                    className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Completed
                </button>
            </div>

            <div className="flex items-center">
                <label
                    htmlFor="sort-by"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
                >
                    Sort by:
                </label>
                <select
                    onChange={(e) => { setSortBy(e.target.value) }}
                    id="sort-by"
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                >
                    <option value="created">Created Date</option>
                    <option value="due">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
        </div>
    );
}


function TaskList({ tasks, onDeleteTask, onEditTask, sortBy, setSortBy, filterBy, setFilterBy }) {
    const filteredTasks = tasks.filter((task) => {
        if (filterBy === 'completed') {
            return task.completed; // Assuming `task.completed` is a boolean
        } else if (filterBy === 'active') {
            return !task.completed;
        }
        return true; // Default: no filtering
    });
    //const reversedTasks = [...tasks].reverse();
    const sortedTasks = filteredTasks.sort((a, b) => {

        if (sortBy === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'description') {
            return a.description.localeCompare(b.description);
        }
        return 0;
    })
    return (
        <>


            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <Filter setSortBy={setSortBy} setFilterBy={setFilterBy} />
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Task List
                </h2>

                {
                    sortedTasks.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <p>No tasks available. Add a new task to get started!</p>
                        </div>
                    ) : (
                        <ul id="task-list" className="space-y-4">
                            {sortedTasks.map((task) => (
                                <li key={task.id}>
                                    <div
                                        className={`task-item p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-3 task-enter priority-${task.priority}`}
                                    >
                                        <div className="flex-1 flex items-start gap-3">
                                            <input type="checkbox" className="custom-checkbox mt-1" />
                                            <div className="flex-1">
                                                <p className="text-gray-800 dark:text-white font-medium break-words">
                                                    {task.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <span
                                                        className={`px-2 py-0.5 rounded-full border border-current inline-flex items-center text-green-500 dark:text-${task.priority === "high"
                                                            ? "red"
                                                            : task.priority === "medium"
                                                                ? "yellow"
                                                                : "green"
                                                            }-400`}
                                                    >
                                                        <i className="fas fa-arrow-down mr-1 text-xs"></i>{" "}
                                                        {task.priority}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full border border-current inline-flex items-center text-blue-500 dark:text-blue-400">
                                                        <i className="far fa-calendar mr-1"></i> {task.dueDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:ml-2 mt-2 sm:mt-0">
                                            <button
                                                onClick={() => onEditTask(task)} // Open the edit modal
                                                className="text-blue-500 hover:text-blue-700 transition duration-200"
                                            >
                                                <i className="fas fa-edit"></i> Edit
                                            </button>
                                            <button
                                                onClick={() => onDeleteTask(task.id)}
                                                className="p-1.5 rounded-md text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                title="Delete"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )


                }
            </div >
        </>
    );
}
function Counter({ tasks }) {
    return (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Task Counter
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Total Tasks: {tasks.length}</p>
        </div>
    );
}

function EditTask({ task, onEditTask, onClose }) {
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [priority, setPriority] = useState(task.priority);

    const handleSave = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            description,
            dueDate,
            priority,
        };
        onEditTask(updatedTask); // Pass the updated task to the parent
    };
    return (
        <div
            id="edit-modal"
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Edit Task
                </h2>
                <form id="edit-task-form" onSubmit={handleSave} className="space-y-4">
                    <input type="hidden" id="edit-task-id" />
                    <div>
                        <label
                            htmlFor="edit-task-input"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Task Description
                        </label>
                        <input
                            type="text"
                            id="edit-task-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What needs to be done?"

                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="edit-due-date"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Due Date (Optional)
                            </label>
                            <input
                                type="date"
                                id="edit-due-date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="edit-priority"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Priority
                            </label>
                            <select
                                id="edit-priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <i className="fas fa-check ml-2"></i>
                            <span>Save</span>

                        </button>

                        <button
                            type="button"
                            id="cancel-edit"
                            onClick={onClose}
                            className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <i className="fas fa-times mr-2"></i>
                            <span>Cancel</span>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Body() {

    const savedTasks = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState(savedTasks ? JSON.parse(savedTasks) : []);


    const [editingTask, setEditingTask] = useState(null); // Track the task being edited
    const [isEditModalVisible, setEditModalVisible] = useState(false); // Track modal visibility
    const [sortBy, setSortBy] = useState('priority');
    const [filterBy, setFilterBy] = useState('all');


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleEditTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))); // Update the task
        setEditModalVisible(false); // Close the modal
    };

    const openEditModal = (task) => {
        setEditingTask(task); // Set the task to be edited
        setEditModalVisible(true); // Show the modal
    };

    const closeEditModal = () => {
        setEditingTask(null); // Clear the editing task
        setEditModalVisible(false); // Hide the modal
    };
    const year = new Date().getFullYear();
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Header />
                <AddTask tasks={tasks} setTasks={setTasks} />

                <Counter tasks={tasks} />
                <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={openEditModal} setSortBy={setSortBy} sortBy={sortBy} filter={filterBy} setFliterBy={setFilterBy} />
                {isEditModalVisible && (
                    <EditTask task={editingTask} onEditTask={handleEditTask} onClose={closeEditModal} />
                )}
                <footer className="text-center mt-8 text-gray-600 dark:text-gray-400">
                    <p>&copy; {year} To-Do List App. All rights reserved.</p>
                    <p>Made with ❤️ by wale</p>
                </footer>
            </div>
        </div>
    );
}

function MainHandle() {
    return (
        <>
            <Body />
            {/*
             Main component for the search bar 
        <>
            <form>
                <div className="relative  md:block">
                    <input
                        id="search-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search city..."
                        className="w-64 pl-10 pr-4 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-light-text dark:text-dark-text transition-all duration-200"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            
            </form>
            <p>My name is: {name}</p>
        </>
        */}
        </>
    );
}

export default MainHandle;
