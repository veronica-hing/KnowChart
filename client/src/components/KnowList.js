import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const KnowList = (props) => {
    const deleteChart = (id) =>{
        axios.delete('http://localhost:8000/api/knowchart/' + id)
            .then(res => {
                props.removeFromDom(id);
                console.log(res);
            })
            .catch(err => console.error(err))
    }
    return (
        <div>
            <ul>
                {props.knowCharts.map((kchart, i) => {
                    return(
                        <li className = "m-2"key={i}>
                            <Link to={kchart._id}>{kchart.name}</Link>
                            <button className = "mx-2 btn btn-danger" onClick = {(e) => {deleteChart(kchart._id)}}>Delete</button>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default KnowList;