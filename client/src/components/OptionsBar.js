import axios from "axios";
import '../App.css';


const OptionsBar = (props) => {
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    //const [rfInstance, setRfInstance] = useState(null);

    const onSaveAs = () => {
        const flow = props.rfInstance.toObject();
        axios.post('http://localhost:8000/api/knowchart', {
            name: props.flowName,
            data: JSON.stringify(flow)
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

    };

    const onSave = () => {
        const flow = props.rfInstance.toObject();
        axios.put('http://localhost:8000/api/knowchart/' + props.id, {
            name: props.flowName,
            data: JSON.stringify(flow)
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    };

    return (
        <div>
            <div className="save__controls">
                {!props.hasSaveButton && <button onClick={onSaveAs}>save as</button>}
                {props.hasSaveButton && <button onClick={onSave}>save</button>}
                
            </div>
        </div>
    );
};

export default OptionsBar;
