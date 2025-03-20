import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function TaskCard({
  details,
  propsDetails,
  setAllTodoTasks,
  edit,
  btnDisable,
  setBtnDisable,
  userEmail,
}: any) {
  const [delIndex, setDelIndex] = useState<any>("");
  const [deleteBtn, setDeleteBtn] = useState<any>(false);
  const [isCompleteAlert, setIsCompleteAlert] = useState<any>(false);

  const [tabData, setTabData] = useState<any>([
    {
      id: 1,
      name: "All Task",
      isActive: true,
      backgroundColor: "#E3EAFD",
      color: "#2C3E91",
    },
    {
      id: 2,
      name: "In Progress Task",
      isActive: false,
      backgroundColor: "#F7F2D7",
      color: "#736C1D",
    },
    {
      id: 3,
      name: "Completed Task",
      isActive: false,
      backgroundColor: "#CCFFD9",
      color: "#227A34",
    },
    // {
    //   id: 4,
    //   name: "Deleted Task",
    //   isActive: false,
    //   backgroundColor: "#FDE4E4",
    //   color: "#B32424",
    // },
  ]);

  const [tabDetails, setTabDetails] = useState<any>([]);

  const screenWidth:any = window.screen.width

  const screenHeight : any = window.screen.height

  useEffect(() => {
    setTabDetails(details);
    setAllTodoTasks(details);
  }, [details]);
  
  function tabHandle(id: any) {
    const updatedTabs = tabData.map((val: any) => ({
      ...val,
      isActive: val.id === id+1, 
    }));
  
    setTabData(updatedTabs);
  
    let filteredTasks = details; 
  
    switch (id) {
      case 1:
        // In Progress Tasks
        filteredTasks = details.filter((val: any) => !val.isComplete);
        break;
      case 2:
        // Completed Tasks
        filteredTasks = details.filter((val: any) => val.isComplete);
        break;
    
      default:
        // All Tasks
        filteredTasks = details;
        break;
    }
  
    setTabDetails(filteredTasks);
  }
  
  

  function handleDelete() {
    // const location = useLocation();
    // const userEmail = location.state?.email || "Guest";
    let filterData = details.filter((val: any, index: any) => {
      return delIndex !== index;
    });
    setAllTodoTasks(filterData);
    localStorage.setItem(userEmail, JSON.stringify(filterData));
    setDeleteBtn(false);
  }

  function editHandle(value: any, index: any) {
    propsDetails(value, index);
  }

  function handleComplete() {
    localStorage.setItem(userEmail, JSON.stringify(details));
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "2%",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            width: "80%",
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            padding:"10px 10px"
          }}
        >
          {tabData.map((val: any, index: any) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexBasis: "33.33%",
                  backgroundColor:
                    val.isActive === true ? val.backgroundColor : "white",
                  justifyContent: val.isActive === true ? "space-between" : "",
                  alignItems: "center",
                  color: val.isActive === true ? val.color : "black",
                  borderBottom: val.isActive
                    ? `3px solid ${val.color}`
                    : "0px solid black",
                  padding: "10px 10px 10px 10px",
                  borderTopRightRadius: index === 3 ? "8px" : 0,
                  borderTopLeftRadius: index === 0 ? "8px" : 0,
                  flexDirection:screenWidth<768?"column":"row",
                  gap:screenWidth<768?"5px":"",
                  height:screenWidth<768?"45px":"30px",
                  cursor:'pointer'
                }}
                onClick={() => tabHandle(index)}
              >
                <div style={{ display: "flex" ,fontSize:screenWidth<768?"10px":"14px",fontWeight:val.isActive?"600":"400"}}>{val.name}</div>
                {val.isActive === true && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: screenWidth<768?"15px":"20px",
                      width: screenWidth<768?"15px":"20px",
                      border: `1px solid ${val.color}`,
                      color: val.color,
                      backgroundColor: val.backgroundColor,
                      borderRadius: "50%",
                      fontSize:screenWidth<768?"10px":"12px",
                      fontWeight:"600",
                     
                    }}
                  >
                    {tabDetails.length}
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      {tabDetails &&
        tabDetails.length !== 0 &&
        tabDetails.map((val: any, index: any) => (
          <div key={index} className="card">
            <div
              className="cardelements"
              style={{
                backgroundColor: index % 2 === 0 ? "white" : "#E3EAFD",
              }}
            >
              <div className="cardelements1">
                <div className="titledesc">
                  <span
                    className={
                      val.isComplete ? "completetasklstcard" : "tasklstcard"
                    }
                    style={{ color: val.isComplete ? "#227A34" : "#1E3A8A" }}
                  >
                    {val.taskTitle}
                  </span>
                  <span
                    className={val.isComplete ? "completetaskCtg" : "taskCtg"}
                    style={{
                      color: "black",
                      fontSize:"15px",
                      fontWeight:500,
                      marginTop:"10px"
                    }}
                  >
                    {val.taskCategory}
                  </span>
                </div>
                <div
                  className={val.isComplete ? "completetaskdesc" : "taskdesc"}
                >
                  <p style={{ color: val.isComplete ? "#227A34" : "#1E3A8A" }}>
                    {val.taskDescription}
                  </p>
                </div>
              </div>
              <div className="functionalbtn">
                {!val.isComplete && (
                  <div className={btnDisable ? "editdisable" : "editbtn"}>
                    <button
                      onClick={() => {
                        editHandle(val, index);
                        edit(false);
                        setBtnDisable(true);
                      }}
                      disabled={btnDisable}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className={btnDisable ? "completedisable" : "completebtn"}>
                  {!val.isComplete && (
                    <button
                      onClick={() => {
                        setDelIndex(index);
                        setIsCompleteAlert(true);
                        edit(true);
                        setBtnDisable(true);
                      }}
                      disabled={btnDisable}
                    >
                      Complete
                    </button>
                  )}
                </div>
                <div className={btnDisable ? "deletedisable" : "deletebtn"}>
                  <button
                    onClick={() => {
                      setDeleteBtn(true);
                      setDelIndex(index);
                      edit(true);
                      setBtnDisable(true);
                    }}
                    disabled={btnDisable}
                  >
                    Delete
                  </button>
                  {deleteBtn === true && index === delIndex && (
                    <div className="deleteModal">
                      <div className="closebtn">
                        <button
                          className="close-btn"
                          onClick={() => {
                            setDeleteBtn(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          X
                        </button>
                      </div>
                      <div className="deletemsg">
                        <p>Are you sure!want to delete task?</p>
                      </div>
                      <div className="functbtn">
                        <button
                          onClick={() => {
                            handleDelete();
                            edit(false);
                            setBtnDisable(false);
                            val.isComplete = false;
                          }}
                        >
                          yes
                        </button>
                        <button
                          onClick={() => {
                            setDeleteBtn(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                  {isCompleteAlert === true && delIndex === index && (
                    <div className="completeModal">
                      <div className="closebtn">
                        <button
                          className="close-btn"
                          onClick={() => {
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          X
                        </button>
                      </div>
                      <div className="completemsg">
                        <p style={{ color: "black" }}>
                          Are you sure!want to Complete task ?{" "}
                        </p>
                      </div>
                      <div className="functbtn">
                        <button
                          onClick={() => {
                            val.isComplete = true;
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                            handleComplete();
                          }}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskCard;
