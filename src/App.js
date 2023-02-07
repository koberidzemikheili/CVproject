import './App.css';
import {Route, Routes} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Personalinfo from './Pages/Personalinfo';
import Experience from './Pages/Experience';
import {UserProvider} from './UserContext';

function App() {
  return (
    <>
    <UserProvider>
    <Routes>
      <Route path="/"exact element={(<Welcome />)}/>
      <Route path="/personalinfo" element={<Personalinfo/>}/>
      <Route path="/experience" element={<Experience/>}/>
    </Routes>
    </UserProvider>
    </>
  );
}

export default App;
