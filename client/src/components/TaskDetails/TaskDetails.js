import "./TaskDetails.css";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../state/AppContext";

const TaskDetails = () => {
  const params = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const globalState = useContext(AppContext);
  const [partialEmailMatch, setPartialEmailMatch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");

  // State pentru comentarii
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Use effect actualizat pentru a prelua comentariile
  useEffect(() => {
    globalState.task.getOne(globalState, params.pid, params.tid);
    globalState.task.getComments(globalState, params.pid, params.tid);

    globalState.task.emitter.addListener("GET_TASK_SUCCESS", () => {
      setSelectedTask(globalState.task.selectedTask);
    });

    globalState.task.emitter.addListener("GET_COMMENTS_SUCCESS", () => {
      setComments(globalState.task.selectedTask.comments || []);
    });
  }, []);

  useEffect(() => {
    setSelectedStatus(globalState.task.selectedTask?.status);
  }, [selectedTask]);

  useEffect(() => {
    globalState.userSuggestion.search(globalState, partialEmailMatch);
    globalState.userSuggestion.emitter.addListener(
      "USER_SEARCH_SUCCESS",
      () => {
        setSuggestions(globalState.userSuggestion.data);
      }
    );
  }, [partialEmailMatch]);

  return (
    <div className="task-details">
      <h1>Task Details</h1>
      {selectedTask?.assignedToId === globalState.user.data.id ? (
        <div className="status-editor">
          <h2>Task status</h2>
          <h3>{selectedTask.title}</h3>
          <div className="description">{selectedTask.description}</div>
          <div className="controls">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="open">OPEN</option>
              <option value="closed">CLOSED</option>
            </select>
            <button
              onClick={() => {
                globalState.task.updateStatus(
                  globalState,
                  params.pid,
                  params.tid,
                  selectedStatus
                );
              }}
            >
              Update
            </button>
          </div>
        </div>
      ) : null}
      {selectedTask.permission?.forUser === globalState.user.data.id ? (
        <div className="task-allocation">
          <h2>Task allocation</h2>
          <div className="description">{selectedTask.description}</div>
          <div className="controls">
            <input
              type="text"
              value={partialEmailMatch}
              onChange={(e) => setPartialEmailMatch(e.target.value)}
              placeholder="search for user email"
            />
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="" disabled>
                Select your option
              </option>

              {suggestions.map((suggestion) => (
                <option key={suggestion.id} value={suggestion.id}>
                  {suggestion.email}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                globalState.task.assign(
                  globalState,
                  params.pid,
                  params.tid,
                  selectedUserId
                );
              }}
            >
              Assign
            </button>
          </div>
        </div>
      ) : null}

      {/* Sectiune de comentarii vizibila doar pentru cei care pot vedea task details */}
      {(selectedTask?.assignedToId === globalState.user.data.id ||
        selectedTask.permission?.forUser === globalState.user.data.id) && (
        <div className="comments-section">
          <h2>Comments</h2>
          <div className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>
                    <strong>{comment.user?.email || "Unknown User"}:</strong>{" "}
                    {comment.content}
                  </p>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Input pentru adăugare comentariu */}
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() => {
                if (newComment.trim() !== "") {
                  globalState.task.addComment(
                    globalState,
                    params.pid,
                    params.tid,
                    newComment
                  );
                  setNewComment("");
                }
              }}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
