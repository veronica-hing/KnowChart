import Flow from "../components/Flow";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FlowEditor = () => {
    const {knowChartID} = useParams();
    const [flowName, setFlowName] = useState("Blank KnowChart");
    const [hasSaveButton, setHasSaveButton] = useState(false);
    useEffect(()=>{
        if(typeof knowChartID === 'string'){
            axios.get('http://localhost:8000/api/knowchart/' + knowChartID)
                .then(res => {
                    setFlowName(res.data.name);
                    setHasSaveButton(true);
                })
        }
    },[]);
    return (
        <div className = "justify-content-center mx-auto">
            <div className="d-flex justify-content-center mx-auto">
                <div>
                    <h1>Let's create a KnowChart</h1>
                    <Link to="/mycharts">Go Back to your KnowCharts</Link>
                    <div className = "d-flex flex-direction-row">
                        <h2>KnowChart Name:</h2>
                        <input type="text" value={flowName} onChange = {(e) =>setFlowName(e.target.value)}/>
                    </div>
                </div>
            </div>
            <Flow flowName = {flowName} hasSaveButton = {hasSaveButton}/>
        </div>
    );
}

export default FlowEditor;