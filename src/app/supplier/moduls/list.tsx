'use client'

import './list.scss'
//----database----
import axios from  'axios'
import { useEffect, useState, useRef } from 'react'
//----redux-------
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit } from '@/store/slice/unit'


export default function Filter(){
    //---------redux------------------
    const dispatch  = useAppDispatch()
    //--------------------------------
    
    const [teches, setTech] = useState<Array<string>>([])
    //-------------ref----------------
    const inputRef =  useRef<any>({})
   

    async function get(){
        return await axios.get('http://localhost:3000/api/teches')
    }

    async function post(id:string){
        return await axios.post('http://localhost:3000/api/teches', {id:id})
    }

    useEffect(()=>{
        get().then(res=>{
            setTech(res.data)

            
            if(Object.keys(inputRef.current).length !== 0){
                inputRef.current[0].classList.add('activeButton') 
            }
           
            
            post(res.data[0].id).then(res=>{
                dispatch(setUnit(res.data))
            })   
        })
        
        
    }, [dispatch])

    return(
        <div className='list'>    
            
            {teches.map((car:any, index:any)=>{
                
                return <input key={index} type='button' value={car.catagory +' '+ car.name} name={car.id} ref={(item:any)=>inputRef.current[index] = item} onClick={()=>{
                        //remove all
                        Object.entries(inputRef.current).forEach((ref:any)=>{
                            ref[1].classList.remove('activeButton')
                        })
                        //add current
                        inputRef.current[index].classList.add('activeButton')
                        //sendRedux
                        post(car.id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    }}/>
                
            })}
        </div>
    )
}
