import './App.css';
import {Route, Routes} from "react-router-dom";
import Welcome from './Pages/Welcome';
import Personalinfo from './Pages/Personalinfo';
import Experience from './Pages/Experience';
import {UserProvider} from './UserContext';
import Education from './Pages/Education';
import Resume from './Pages/Resume';
import { FetchedDegreeProvider } from './FetchedDegreeContext';
import { FinalDataProvider } from './FinalDataContext';
import AuthContextProvider from './AuthContext';

function App() {
  return (
    <>
    <AuthContextProvider>
    <FinalDataProvider>
    <FetchedDegreeProvider>
    <UserProvider>
    <Routes>
      <Route path="/"exact element={(<Welcome />)}/>
      <Route path="/personalinfo" element={<Personalinfo/>}/>
      <Route path="/experience" element={<Experience/>}/>
      <Route path="/education" element={<Education/>}/>
      <Route path="/resume" element={<Resume/>}/>
    </Routes>
    </UserProvider>
    </FetchedDegreeProvider>
    </FinalDataProvider>
    </AuthContextProvider>
   
    </>
  );
}

export default App;
