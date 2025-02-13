import "./ProjectList.css";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../state/AppContext";
import { useNavigate } from "react-router-dom";

import Project from "./Project";
import Paginator from "../Paginator/Paginator";

const ProjectList = () => {
  const globalState = useContext(AppContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    globalState.project.getAll(
      globalState,
      pageNumber,
      pageSize,
      filterField,
      filterValue,
      sortField,
      sortOrder
    );
    const subscription = globalState.project.emitter.addListener(
      "GET_PROJECTS_SUCCESS",
      () => {
        setProjects(globalState.project.data);
      }
    );
    return () => {
      console.log("ProjectList: Unsubscribing from GET_PROJECTS_SUCCESS");
      subscription.remove();
    };
  }, [pageNumber, pageSize, filterField, filterValue, sortField, sortOrder]);

  // added handlePageSizeChange function
  const handlePageSizeChange = (newSize) => {
    setPageSize(parseInt(newSize));
    setPageNumber(1);
  };
  return (
    <div className="project-list">
      <h1>Project List</h1>
      <table>
        <thead>
          <tr>
            <th>
              <div>Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setFilterField("name");
                }}
                placeholder="name filter"
              />
              <button
                onClick={() => {
                  setSortField("name");
                  setSortOrder("asc");
                }}
              >
                ⌃
              </button>
              <button
                onClick={() => {
                  setSortField("name");
                  setSortOrder("desc");
                }}
              >
                ⌄
              </button>
            </th>
            <th>
              <div>Description</div>
              <input
                type="text"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                  setFilterField("description");
                }}
                placeholder="description filter"
              />
              <button
                onClick={() => {
                  setSortField("description");
                  setSortOrder("asc");
                }}
              >
                ⌃
              </button>
              <button
                onClick={() => {
                  setSortField("description");
                  setSortOrder("desc");
                }}
              >
                ⌄
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </tbody>
      </table>
      {/* Added totalRecords prop */}
      <Paginator
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={handlePageSizeChange}
        totalRecords={globalState.project.count}
      />
      <div className="footer">
        <button onClick={() => navigate("/projects/new")}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
