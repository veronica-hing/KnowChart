import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';
import OptionBar from './OptionsBar';

import Sidebar from './Sidebar';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const { knowChartID } = useParams();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  //the reactFlowInstance is what we save to the DB
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  //get the stuff from the database to put in our onload function
  useEffect( () => {
    const restoreFlow = async () => {
      axios.get('http://localhost:8000/api/knowchart/'+ knowChartID)
      .then(res => {
        const loadedFlow = JSON.parse(res.data.data);
        console.log(loadedFlow);
        setReactFlowInstance(loadedFlow);//CHANGEME
        setEdges(loadedFlow.edges || []);
        setNodes(loadedFlow.nodes || []);
      })
      // .then(()=>{
      //   setNodes(reactFlowInstance.nodes || []);
      //   setEdges(reactFlowInstance.edges || []);
      // })
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

  return (
    <div className="dndflow" style={{width:'90%', height:'60vh',border: 'solid 2px red'}}>
      {/* <p>{knowChartID}</p> */}
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background/>
            <Controls />
          </ReactFlow>
        </div>
        <aside>
          <OptionBar
            setNodes = {setNodes}
            setEdges = {setEdges}
            rfInstance = {reactFlowInstance}
            setRfInstance = {setReactFlowInstance}
          />
          <Sidebar />
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
