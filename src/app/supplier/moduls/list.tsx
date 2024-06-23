'use client'

import './list.scss'
//---------module-
import Search from './search/search'
//----database----
import axios from  'axios'
import { useEffect, useState, useRef } from 'react'
//----redux-------
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit } from '@/store/slice/unit'
//-----url------
import url from '@/app/axios/URLs'

export default function Filter(){
    //---------redux------------------
    const dispatch  = useAppDispatch()
    let search = useAppSelector<any>(state => state.search.search)
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)
    
    //--------------------------------
    
    const [teches, setTech] = useState<Array<string>>([])
    //-------------ref----------------
    const inputRef =  useRef<any>({})
    const sortInputRef = useRef<any>({})
   

    async function get(){
        return await axios.get(url.teches)
    }

    async function post(id:string){
        return await axios.post(url.teches, {id:id})
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
    //----------------------------------------Search_logic--------------------------------------
    let search_array:any = []
    

    teches.forEach((car:any)=>{
        
        // if(car.parts.filter((part:any)=>part.name === search).length !== 0){
        //     search_array.push(car)
        // }
       
        if(car.parts.filter((part:any)=>{ return (part.name.toLowerCase().includes(search.toLowerCase()))}).length !== 0){
            search_array.push(car)
        }
    })
    //------------------------------------------------------------------------------------------
    
    

    return(
        <div className='list'>    
            <Search />
            {search === ""?
            teches.map((car:any, index:any)=>{
                
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
                
            })
            :
            search_array.map((car:any, index:any)=>{
                
                return <input key={index} type='button' value={car.catagory +' '+ car.name} name={car.id} ref={(item:any)=>sortInputRef.current[index] = item} onClick={()=>{
                        //remove all
                        Object.entries(sortInputRef.current).forEach((ref:any)=>{
                            ref[1].classList.remove('activeButton')
                           
                        })
                        //add current
                        sortInputRef.current[index].classList.add('activeButton')
                        //sendRedux
                        post(car.id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    }}/>
                
            })}
        </div>
    )
}
