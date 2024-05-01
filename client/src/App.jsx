import { useEffect, useState,createContext } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { Route, Routes } from 'react-router-dom'
import axios from './utils/axios'
import { useNavigate } from 'react-router-dom'
import CreateQuestion from './pages/Question/CreateQuestion'
import Detail from './pages/Question/Detail'
export const Appstate=createContext()

function App() {
  const [user,setUser]=useState({})
  const token=localStorage.getItem('token')
  const navigate=useNavigate();
  async function checkUser(){
    try {
      const {data} = await axios.get("/users/check",{
        headers:{
          Authorization:"Bearer "+token
        }
      })
      setUser(data)
      console.log(data)
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(()=>{
    checkUser()
  },[])

  return (
    <Appstate.Provider value={{user,setUser}}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/question-detail:questionId' element={<Detail />} />
        <Route path='/create-question' element={<CreateQuestion />} />
      </Routes>
    </Appstate.Provider>
  )
}

export default App
