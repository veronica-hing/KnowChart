import { useCallback, useState } from "react";
import { Handle, Position } from "react-flow-renderer";

const TextNode = ({data}) => {
    const [text, setText] = useState(data.label);
    const onChange = useCallback((e) =>{
        setText(e.target.value);
        data.label = e.target.value;
    },[]);

    return (
        <>
            <Handle type="target" position={Position.Top} />
                <input name="text" onChange = {onChange} value = {text}/>
            <Handle type="source" position={Position.Bottom} />   
        </>
    );
}

export default TextNode;