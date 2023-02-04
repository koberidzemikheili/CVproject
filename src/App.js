import './App.css';
import {Route, Routes} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Personalinfo from './Pages/Personalinfo';


function App() {
  return (
    <>
    
    <Routes>
      <Route path="/"exact element={(<Welcome />)}/>
      <Route path="/personalinfo" element={<Personalinfo/>}/>
    </Routes>
    
    </>
  );
}

export default App;
