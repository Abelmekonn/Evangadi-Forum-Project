import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";



function Answer({questionId}) {
    const [answers,setAnswer]=useState([]);
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
    }, [questionId]); // Adding questionId as a dependency to useEffect

    return (
        <div>
            {answers?.map(answer => (
                <div key={answer.answerid}>
                    <p>{answer.username}</p>
                    <p>{answer.answer}</p>
                </div>
            ))}
        </div>
    )
}

export default Answer;
