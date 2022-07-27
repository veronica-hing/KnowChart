import logo from './logo.svg';
import './App.css';
import Flow from './components/Flow';

function App() {
  return (
    <div className="App">
      {/* size specified here otherwise the flow doesnt render properly */}
      <div style={{width:'90%', height:'60vh',border: 'solid 2px red'}}>
        <Flow/>
      </div>
    </div>
  );
}

export default App;
