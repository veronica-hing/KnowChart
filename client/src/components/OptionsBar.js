import React, {useCallback } from 'react';
import axios from "axios";
import { useReactFlow } from 'react-flow-renderer';

import '../App.css';

const flowKey = 'example-flow';

const OptionBar = (props) => {
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    //const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const onSave = () => {
        console.log('onsave clicked')
        //check if it's not there, post a new one
        if (props.rfInstance) {
            console.log('saving flow to object in database now');
            const flow = props.rfInstance.toObject();
            axios.post('http://localhost:8000/api/knowchart', {
                name: "TestName to change later",
                data: JSON.stringify(flow)
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            //localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    };

    const onRestore = () => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));
            console.log('onrestore clicked')

            if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            props.setNodes(flow.nodes || []);
            props.setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
            }
        };
        restoreFlow();
    };

    return (

        <div className="save__controls">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
        </div>
    );
};

export default OptionBar;
