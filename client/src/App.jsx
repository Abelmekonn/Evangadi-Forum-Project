import { useEffect, useState,createContext } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import axios from './utils/axios'
import { useNavigate } from 'react-router-dom'
import CreateQuestion from './pages/Question/CreateQuestion'
import Detail from './pages/Question/Detail'
import Auth from './pages/Auth/Auth'
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
        <Route path='/login' element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path='/question-detail/:questionId' element={<Detail />} />
        <Route path='/create-question' element={<CreateQuestion />} />
      </Routes>
    </Appstate.Provider>
  )
}

export default App
