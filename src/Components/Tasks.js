import '../styles/task.scss'
import { useState } from "react";
import { FiEdit, FiMinusCircle, FiArrowRightCircle, FiArrowLeftCircle, FiXCircle } from "react-icons/fi";

export default function Tasks(props) {
    const { addTask, deleteTask, moveTask, task } = props;
    const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    const [btnStatus, setBtnStatus] = useState(task.status);
    const [date, setDate] = useState(task.urgency);

    function setUrgency(event) {
        setUrgencyLevel(event);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false);
            } else {
                let newTask = {
                    id: task.id,
                    title: event.target.elements.title.value,
                    description: event.target.elements.description.value,
                    urgency: urgencyLevel,
                    status: task.status,
                    isCollapsed: true,
                };
                console.log(newTask);
                addTask(newTask);
                setCollapsed(true);
            }
        }

        if (formAction === "delete") {
            deleteTask(task.id);
        }
    }

    function handleMoveLeft() {
        let newStatus = "";

        if (task.status === "To Do") {
            setBtnStatus('Backlog');
            newStatus = "Backlog";
        } else if (task.status === "Completed") {
            setBtnStatus('Completed');
            newStatus = "To Do";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    function handleMoveRight() {
        let newStatus = "";

        if (task.status === "Backlog") {
            setBtnStatus('Backlog');
            newStatus = "To Do";
        } else if (task.status === "To Do") {
            newStatus = "Completed";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    const handleDate = (e) => {
        let d = e.target.value;
        setDate(d);
        setUrgency(d);
    }

    return (
        <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
            {/* {btnStatus !== 'Backlog' && <button onClick={handleMoveLeft} className="button moveTask">
                &#171;
            </button>} */}
            <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                <input
                    type="text"
                    className="title input card-header"
                    name="title"
                    placeholder="Add Title"
                    disabled={collapsed}
                    defaultValue={task.title}
                />
                <textarea
                    rows="2"
                    className="description input"
                    name="description"
                    placeholder="Add Description"
                    defaultValue={task.description}
                    disabled={collapsed}
                />
                <div className="collapsedBtn">
                    <div className="urgencyLabels">
                        {/* <label className={`low ${urgencyLevel === "low" ? "selected" : ""} btn btn-primary `}>
                            <input urgency="low" onChange={setUrgency} type="radio" name="urgency" />
                            low
                        </label>
                        <label className={`medium ${urgencyLevel === "medium" ? "selected" : ""}  btn btn-primary`}>
                            <input urgency="medium" onChange={setUrgency} type="radio" name="urgency" />
                            medium
                        </label>

                        <label className={`high ${urgencyLevel === "high" ? "selected" : ""}`} >
                            <input urgency="high" onChange={setUrgency} type="radio" name="urgency" />
                            high
                        </label> */}
                        {!collapsed && <div className="container">
                            <p>Select Deadline</p>
                            < input type="date" className="form-control mt-0" id="date" onChange={handleDate} /></div>}
                    </div>
                    {collapsed && <div className='button'>
                        {date}
                    </div>}
                    <button onClick={() => { setFormAction("save"); }} className={`button ${collapsed ? "save" : ""}`}>{collapsed ? <FiEdit /> : "Save"} </button>
                    {
                        !collapsed && <button onClick={() => { setFormAction("delete") }} className="button" >{collapsed ? "" : "delete"}</button>
                    }

                    {
                        collapsed && <button onClick={() => { setFormAction("delete") }} className="button delete"><FiXCircle /></button>
                    }
                </div>
            </form>

            <div className="LRbtn">
                {btnStatus !== 'Backlog' && <button onClick={handleMoveLeft} className="button moveTask">
                    <FiArrowLeftCircle />
                </button>}

                {btnStatus !== 'Completed' && <button onClick={handleMoveRight} className="button moveTask">
                    <FiArrowRightCircle />
                </button>}
            </div>
        </div>
    );
}