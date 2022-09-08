import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import Styles from "styles/QuestionNode.module.scss";

const handleStyle = { left: 10 };

function QuestionNode({ data }) {
  console.log("data", data);

  return (
    <div className={Styles.textUpdaterNode}>
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{data.question ? data.question : "Question placeholder"}</p>
        {data?.options?.map((option, index) => (
          <div key={index}>
            {option.first}
            <Handle
              type="source"
              position={Position.Right}
              id={option}
              style={handleStyle}
            />
          </div>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default QuestionNode;
