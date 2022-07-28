import logo from './logo.svg';
import './App.css';
import FlowEditor from './views/FlowEditor';
import LoginReg from './views/LoginReg';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={ <LoginReg />} />
        <Route path = "/knowchart" element = {<FlowEditor/>} />
      </Routes>
  );
}

export default App;
