import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Data from './Data';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/' element={<Data/>}></Route>
        <Route path='/Create' element={<Create/>}></Route>
        <Route path='/Edit/:id' element={<Edit/>}></Route>
        <Route path='/Delete/:id' element={<Delete/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
