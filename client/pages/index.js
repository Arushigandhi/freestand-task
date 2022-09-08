import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useKeyPress,
} from "react-flow-renderer";

import Styles from "styles/ReactFlow.module.scss";
import { Button, Form, Input, Modal } from "antd";

let id = 1;
const getNodeId = () => `${id++}`;

const initialNodes = [
  {
    id: "1",
    data: { label: "Add starting question" },
    position: { x: 250, y: 180 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 400 },
  },
  {
    id: "1a",
    data: { label: "Add option 1" },
    position: { x: 20, y: 50 },
    parentNode: "1",
    type: "input",
    extent: "parent",
  },
  {
    id: "1b",
    data: { label: "Add option 2" },
    position: { x: 20, y: 120 },
    parentNode: "1",
    type: "input",
    extent: "parent",
  },
];

const Develop = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeName, setNodeName] = useState("NodeName");
  const [nodeId, setNodeId] = useState("-1");
  const [parentId, setParentId] = useState("-1");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddOption = useCallback(() => {
    // setIsModalOpen(true);
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      // parentNode: parentId,
      type: "input",
      // extent: "parent",
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onAddQuestion = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Add starting question" },
      className: "light",
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        width: 200,
        height: 400,
      },
      position: {
        x: Math.random() * window.innerWidth - 500,
        y: Math.random() * window.innerHeight - 300,
      },
      // type: "group",
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onNodeClick = (e, object) => {
    setNodeId(object.id);
    setNodeName(" ");
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes, nodeId]);
  const spacePressed = useKeyPress("Space");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={Styles.floatingedges}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll={true}
          panOnDrag={spacePressed}
          onNodeClick={onNodeClick}
        >
          <div className={Styles.save__controls2}>
            <Button onClick={onAddQuestion}>Add New Flow:</Button>
          </div>
          <div className={Styles.save__controls}>
            <Button onClick={onAddOption}>Add Option to Question:</Button>
          </div>
          <div className={Styles.updatenode__controls}>
            <label>Add text to selected node:</label>
            <Input
              value={nodeName}
              onChange={(evt) => setNodeName(evt.target.value)}
            />
            <label>Id of selected node:</label>
            <label>{nodeId}</label>
            {/* <label>Add parent id of option:</label>
            <Input
              value={parentId}
              onChange={(evt) => setParentId(evt.target.value)}
            /> */}
          </div>
          <Background />
        </ReactFlow>
        <Modal open={isModalOpen} footer={null} onCancel={closeModal}>
          <label>Add parent id of option:</label>
          <Form
            onFinish={(values) => {
              setParentId(values.parId);
              closeModal();
              console.log(values.parId);
            }}
          >
            <Form.Item name="parId">
              <Input />
            </Form.Item>
            <Button
              type="primary"
              onClick={closeModal}
              style={{ marginTop: "1rem" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Develop />
  </ReactFlowProvider>
);
