import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  applyNodeChanges,
} from 'react-flow-renderer';
import OptionsBar from './OptionsBar';
import TextNode from './TextNode';
import Sidebar from './Sidebar';


let id = 0;
const getId = () => `dndnode_${id++}`;
let initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'first node' },
    position: { x: 250, y: 5 },
  },
];

const Flow = (props) => {
  const reactFlowWrapper = useRef(null);
  const nodeTypes = useMemo(() => ({textNode: TextNode}),[]);
  const { knowChartID } = useParams();


  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  //the reactFlowInstance is what we save to the DB
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  //get the stuff from the database to put in our onload function
  useEffect( () => {
    const restoreFlow = async () => {
      axios.get('http://localhost:8000/api/knowchart/'+ knowChartID)
      .then(res => {
        console.log(JSON.parse(res.data.data));
        const loadedFlow = JSON.parse(res.data.data);
        setReactFlowInstance(loadedFlow);
        setEdges(loadedFlow.edges || []);
        setNodes(loadedFlow.nodes || []);
      })
      .then( console.log(reactFlowInstance));
    };
    if(typeof knowChartID === 'string'){
      restoreFlow();
    }
  },[]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
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
  

  const onNodeDoubleClick = (event, node) => {
    console.log(node)
    let updatedNode = { ...node};
    updatedNode.data.label = event.target.value;
    let newNodeList = nodes.filter(n => n.id != node.id);
    newNodeList.push(updatedNode);
    setNodes(newNodeList);
  }
  return (
    <div className="dndflow" style={{height:'60vh',border: 'solid 2px red', margin: '1em 10vw'}}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick = {onNodeDoubleClick}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <aside>
          <OptionsBar
            flowName = {props.flowName}
            setNodes = {setNodes}
            setEdges = {setEdges}
            rfInstance = {reactFlowInstance}
            setRfInstance = {setReactFlowInstance}
            id = {knowChartID}
            hasSaveButton = {props.hasSaveButton}
          />
          <Sidebar />
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
