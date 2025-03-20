import { useEffect, useState } from "react";
import "./index.css";
import TaskCard from "../TaskCard";
import { useLocation, useNavigate } from "react-router";

function HomePage() {
  const location = useLocation();
  const userName = location.state?.name || "Guest";
  const userEmail = location.state?.email || "Guest";
  const [taskDetails, setTaskDetails] = useState<any>({
    id: "",
    taskTitle: "",
    taskCategory: "",
    taskDescription: "",
    isComplete: false,
  });
  const [allTodoTasks, setAllTodoTasks] = useState<any>([]);
  const [isTodo, setIsTodo] = useState<any>(false);
  const category:any = [
    { value: "default", checked: false },
    { value: "Personal", checked: false },
    { value: "Official", checked: false },
    { value: "Travel", checked: false },
    { value: "PhysicalHealth", checked: false },
  ];
  const [editIndex, SetEditIndex] = useState<any>("");
  const [isEdit, setIsEdit] = useState<any>(false);
  const [isAdd, setIsAdd] = useState<any>(false);
  const [descriptionAlert, setDescriptionAlert] = useState<any>(false);
  const [btnDisable, setBtnDisable] = useState<any>(false);
  const [localSave, setLocalSave] = useState<any>([]);
  const navigate = useNavigate();


  async function handleEvent(e: any) {
    if (e.target.name === "tasktitle") {
      setTaskDetails({
        ...taskDetails,
        taskTitle: e.target.value.slice(0, 20),
      });
    } else if (e.target.name === "taskCategory") {
      setTaskDetails({
        ...taskDetails,
        taskCategory: e.target.value === "default" ? "" : e.target.value,
      });
    } else if (e.target.name === "taskDescription") {
      setTaskDetails({
        ...taskDetails,
        taskDescription: e.target.value.slice(0, 101),
      });
    }
  }
 

  useEffect(() => {
    const userEmail = location.state?.email || "Guest";
    const storedTasks = JSON.parse(localStorage.getItem(userEmail) || "[]");
    setAllTodoTasks(storedTasks);
  }, [localSave]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(userEmail) || "[]");
    setAllTodoTasks(storedTasks);
  }, [userEmail]);

  function submitHandle() {
    if (isTodo && taskDetails.taskDescription === "") {
      setDescriptionAlert(true);
    }
    if (editIndex === "" && taskDetails.taskDescription !== "") {
      let value = {
        id: localSave.length + 1,
        taskTitle: taskDetails.taskTitle,
        taskCategory: taskDetails.taskCategory,
        taskDescription: taskDetails.taskDescription,
        isComplete: taskDetails.isComplete,
      };
      setLocalSave([...localSave, value]);

      const userTasks = JSON.parse(localStorage.getItem(userEmail) || "[]");
      const updatedTasks = [...userTasks, value];

      localStorage.setItem(userEmail, JSON.stringify(updatedTasks));
      setDescriptionAlert(false);
      setBtnDisable(false);
      setIsTodo(false);
      setTaskDetails({
        taskTitle: "",
        taskCategory: "",
        taskDescription: "",
      });
    } else if (editIndex !== "" && taskDetails.taskDescription !== "") {
      (allTodoTasks[editIndex].id = taskDetails.id),
        (allTodoTasks[editIndex].taskTitle = taskDetails.taskTitle);
      allTodoTasks[editIndex].taskCategory = taskDetails.taskCategory;
      allTodoTasks[editIndex].taskDescription = taskDetails.taskDescription;
      allTodoTasks[editIndex].isComplete = taskDetails.isComplete;

      localStorage.setItem(userEmail, JSON.stringify([...allTodoTasks]));
      setDescriptionAlert(false);
      setBtnDisable(false);
      setIsTodo(false);
      setTaskDetails({
        taskTitle: "",
        taskCategory: "",
        taskDescription: "",
      });
      SetEditIndex("");
    }
  }

  function handleEditChild(cardDetails: any, index: any) {
    setTaskDetails(cardDetails);
    SetEditIndex(index);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            width: "95%",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              fontSize: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: "#1E3A8A",
              color: "white",
              fontWeight: "500",
            }}
            onClick={() => navigate("/")}
          >
            Logout
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "20px", color: "black" }}>
          welcome ! {userName}
        </div>
      </div>
      <div className="OuterBox">
        <div className="header">
          <h2>My Plans</h2>
        </div>
      </div>
      <div className="tasksection">
        <div className="taskinput" style={{ borderRadius: "10px" }}>
          <div className="task1">
            <div className="tasktitle">
              <label>Title:</label>
              <input
                type="text"
                name="tasktitle"
                value={taskDetails.taskTitle}
                onChange={handleEvent}
                disabled={isEdit}
              ></input>
              {isAdd && taskDetails.taskTitle === "" && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  Please Enter the Title
                </span>
              )}
            </div>
            <div className="taskCategory">
              <label>Category:</label>
              <select
                name="taskCategory"
                id="category"
                value={taskDetails.taskCategory}
                onChange={handleEvent}
                disabled={isEdit}
              >
                {category.map((Val: any, index: any) => {
                  return (
                    <option value={Val.value} key={index}>
                      {Val.value === "default"
                        ? "Select a category"
                        : Val.value}
                    </option>
                  );
                })}
              </select>
              {isAdd && taskDetails.taskCategory === "" && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  Please Select the Title
                </span>
              )}
            </div>
          </div>

          <div className={isEdit ? "addbtndisable" : "addbtn"}>
            <button
              onClick={() => {
                setIsAdd(true);
                taskDetails.taskTitle !== "" &&
                  taskDetails.taskCategory !== "" &&
                  setIsTodo(true);
              }}
              disabled={isEdit}
            >
              Add Todo
            </button>
          </div>
        </div>
        {isTodo &&
          taskDetails.taskTitle !== "" &&
          taskDetails.taskCategory !== "" && (
            <div className="modal">
              <div className="closebutton">
                <button
                  className="close-btn"
                  onClick={() => {
                    setIsTodo(false);
                    setIsAdd(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="textarea">
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={{ color: "black" }}>Description</label>
                  <textarea
                    name="taskDescription"
                    value={taskDetails.taskDescription}
                    onChange={handleEvent}
                  ></textarea>
                  {descriptionAlert && taskDetails.taskDescription === "" && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please Enter the taskDescription
                    </div>
                  )}
                </div>
                <div className="Submitbtn">
                  <button
                    onClick={() => {
                      submitHandle();
                      setIsAdd(false);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setIsTodo(false);
                      setIsAdd(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>

      <TaskCard
        details={allTodoTasks}
        propsDetails={handleEditChild}
        setAllTodoTasks={setAllTodoTasks}
        edit={setIsEdit}
        btnDisable={btnDisable}
        setBtnDisable={setBtnDisable}
        userEmail={userEmail}
      />
    </div>
  );
}

export default HomePage;
