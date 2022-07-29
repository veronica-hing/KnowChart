import React, {useState, useEffect} from 'react';
import axios from 'axios';
import KnowList from '../components/KnowList';
import { Link } from 'react-router-dom';

const ViewKnowList = () => {
    const [ kChart, setKChart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const removeFromDom = (id) =>{
        setKChart(kChart.filter(chart => chart._id != id));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/knowchart')
            .then( res => {
                setKChart(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    },[]);

    return(
        <div>
            <h2>Here's your KnowCharts!</h2>
            <Link to="/knowchart">Create a NEW Chart</Link>
            {loaded && <KnowList knowCharts = {kChart} removeFromDom = {removeFromDom}/>}
        </div>
    )
}

export default ViewKnowList;