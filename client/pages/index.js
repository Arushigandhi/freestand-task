import React, { useState, useRef, useCallback, useEffect } from "react";
import { Modal, Button, Form, Input, Space, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useNodes,
} from "react-flow-renderer";

import Sidebar from "../components/Sidebar";
import Styles from "styles/ReactFlow.module.scss";
import QuestionNode from "../components/QuestionNode";

const nodeTypes = { questionNode: QuestionNode };

let id = 0;
const getId = () => `dndnode_${id++}`;

const Dnd = () => {
  const [startingNode, setStartingNode] = useState({});

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    setNodes([
      {
        id: "1",
        type: "questionNode",
        data: startingNode,
        position: { x: 250, y: 5 },
      },
    ]);
  }, [startingNode]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={Styles.dndflow}>
        {/* <ReactFlowProvider> */}
        <div className={Styles.reactflowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={(event, node) => {
              showModal();
            }}
            fitView
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
        {/* </ReactFlowProvider> */}
        <Modal title="Set Question" open={isModalOpen} footer={null}>
          <Form
            name="dynamic_form_nest_item"
            autoComplete="off"
            layout="vertical"
            onFinish={(values) => {
              setStartingNode(values);
              setIsModalOpen(false);
            }}
          >
            <Form.Item name="question" label="Question">
              <Input placeholder="Question" />
            </Form.Item>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key}>
                      <Form.Item
                        key={key}
                        {...restField}
                        name={[name, "option"]}
                      >
                        <Input placeholder="Enter an option" />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{
                          marginLeft: 8,
                          marginTop: 8,
                        }}
                      />
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Reply Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Dnd />
  </ReactFlowProvider>
);
