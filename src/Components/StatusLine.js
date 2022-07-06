import '../styles/statusLine.scss'
import Tasks from "./Tasks";
import { FiPlus } from "react-icons/fi";

export default function StatusLine(props) {
    const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

    let taskList, tasksForStatus;

    function handleAddEmpty() {
        addEmptyTask(status);
    }

    if (tasks) {
        tasksForStatus = tasks.filter((task) => {
            return task.status === status;
        });
    }

    if (tasksForStatus) {
        taskList = tasksForStatus.map((task) => {
            return (
                <Tasks
                    addTask={(task) => addTask(task)}
                    deleteTask={(id) => deleteTask(id)}
                    moveTask={(id, status) => moveTask(id, status)}
                    key={task.id}
                    task={task}
                />
            );
        });
    }
    return (
        <div className='container'>
            <div className="statusLine">
                <h3 className='heading'>{status}</h3>
                <button onClick={handleAddEmpty} className="addBtn">
                    <FiPlus />
                </button>
                {/* <h3>{status}</h3> */}
                <div>{taskList}</div>
                {/* {status === 'To Do' && <button onClick={handleAddEmpty} className="button mt-3">
                Add Task
            </button>
            } */}
            </div>
        </div>
    );
}