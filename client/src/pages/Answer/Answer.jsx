import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import { use } from "../../../../routes/answerRoute";


function Answer({questionId}) {
    const [answer,setAnswer]=useState([]);
    const [error,setError]=useState();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token){
            axios.get(`/answer/all/${questionId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((res)=>{
                if(Array.isArray(res.data)){
                    setAnswer(res.data)
                }else{
                    setError("No Answers Yet")
                }
            })
        }
    })

    return (
        <div>
        
        </div>
    )
}

export default Answer
