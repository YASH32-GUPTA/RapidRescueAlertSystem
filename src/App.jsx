import './App.css'

// URLS 
import { BrowserRouter,Routes,Route} from 'react-router-dom' ;

// Pages  
import SignUp from '../pages/SIgnUp/SignUp';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import Place from '../pages/Place/Place';
import Sos from '../pages/SOS/Sos';
import VideoUploadForm from '../GCP/Upload';

function App() {

  return (
    <div className='main'>
    <BrowserRouter>
         <Routes>
             <Route path="/" element={<SignUp/>}></Route>
             <Route path="/home" element={<HomeScreen/>}></Route>
             <Route path="/place" element={<Place/>}></Route>
             <Route path="/sos" element={<Sos/>}></Route>
             <Route path="/upload" element={<VideoUploadForm/>}></Route>
         </Routes>
     </BrowserRouter>
  </div>
  )
}

export default App
 