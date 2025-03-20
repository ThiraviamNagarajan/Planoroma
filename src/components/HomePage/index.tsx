import axios from "axios";
import { useEffect, useState } from "react";
import MovieDetails from "../MovieDetails";

// const HomePage = () => {

//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   async function fetchMovies() {
//     const options = {
//       method: 'GET',
//       url: 'https://movies-ratings2.p.rapidapi.com/ratings',
//       params: {id: 'tt0111161'},
//       headers: {
//         'x-rapidapi-key': 'db7f657f61msh1e0db72afecad16p14684djsn094675381a56',
//         'x-rapidapi-host': 'movies-ratings2.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           left: 0,
//           backgroundColor: "gray",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "20px 50px",
//           color: "white",
//           borderBottomLeftRadius:"8px",
//           borderBottomRightRadius:"8px",
//         }}
//         className="navbar"
//       >
//         <div><PiFilmSlateFill size={40} /></div>
//         <div>"Welcome to MovieBuff"</div>
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="Search for movies"
//             value=""
//             style={{
//               padding: "5px",
//               borderRadius: "3px",
//               border: "1px solid #ccc",
//               fontSize: "12px",
//               backgroundColor: "white",
//               outline: "none",
//             }}
//           />
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           height: "100%",
//           width: "100%",
//           color: "var(--primary-color)",
//           backgroundColor: "var(--tertiary-color)",
//         }}
//       >
//         <div style={{ width: "80%" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               color: "var(--secondary-color)",
//               marginTop: "20px",
//               flexWrap: "wrap",
//               gap: "25px",
//             }}
//           >
//             {movies.map((movie: any) => (
//               <MovieDetails key={movie.id} movie={movie} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;
import "./index.css";
import TaskCard from "../TaskCard";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useNavigationControl } from "../../NavigationProvide";
// import TaskCard from "./TaskCard";

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
  const [category, setCategory] = useState<any>([
    { value: "default", checked: false },
    { value: "Personal", checked: false },
    { value: "Official", checked: false },
    { value: "Travel", checked: false },
    { value: "PhysicalHealth", checked: false },
  ]);
  const [editIndex, SetEditIndex] = useState<any>("");
  const [isEdit, setIsEdit] = useState<any>(false);
  const [isAdd, setIsAdd] = useState<any>(false);
  const [descriptionAlert, setDescriptionAlert] = useState<any>(false);
  const [btnDisable, setBtnDisable] = useState<any>(false);
  const [localSave, setLocalSave] = useState<any>([]);
  const navigate = useNavigate();

  const { enableNavigation } = useNavigationControl();

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
  // useEffect(() => {
  //   const storedTodoList = localStorage.getItem("todolist");
  //   const localTodoList = storedTodoList ? JSON.parse(storedTodoList) : [];

  //   if (localSave.length > 0) {
  //     const updatedTodoList = [...localTodoList, ...localSave];
  //     localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
  //     setAllTodoTasks(updatedTodoList);
  //   } else {
  //     setAllTodoTasks(localTodoList);
  //   }
  // }, [localSave]);

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
