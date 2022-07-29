import logo from './logo.svg';
import './App.css';
import FlowEditor from './views/FlowEditor';
import LoginReg from './views/LoginReg';
import ViewKnowList from './views/ViewKnowList';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={ <LoginReg />} />
        <Route path = "/knowchart" element = {<FlowEditor/>} />
        <Route path = "/mycharts/:knowChartID" element = {<FlowEditor/>} />
        <Route path = "/mycharts" element = {<ViewKnowList/>} />
      </Routes>
  );
}

export default App;
