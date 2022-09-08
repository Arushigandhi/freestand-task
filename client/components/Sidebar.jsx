import React from "react";
import Styles from "styles/ReactFlow.module.scss";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={Styles.aside}>
      <div className={Styles.description}>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className={Styles.dndnodeInput}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className={Styles.dndnode}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className={Styles.dndnodeOutput}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
