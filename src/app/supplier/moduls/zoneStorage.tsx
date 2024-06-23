'use client'
//---next----
import Image from 'next/image'
import axios from 'axios'
import { useEffect } from 'react'
//----res----
import plus from '@/res/plus.svg'
import './zoneStorage.scss'
//----package---
import React,{  useState } from 'react'
//----moduls----
import Part from './part'
import AddPanel from './addPanel'
//----redux-----
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit } from '@/store/slice/unit'
//------url-----
import url from '@/app/axios/URLs'


export default function ZoneStorage(){
    //----redux------
    const selector = useAppSelector<any>(state => state.unit.unit)
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)
    
    //console.log(selector.parts)
    //---state-------
    const [view_addButton, setView_addButton] = useState<boolean>(false)
    //console.log(selector)
    //---------------sortArray-----------------
    //-----------------state----------------------
    let [category, setCategory] = useState<Array<object>>([])
    let [openCategory, setOpenCategory] = useState<string>('default')



    //------------------fs------------------------
    async function categoryes() {
        return await axios.get(url.catagoryes)
    }
    useEffect(()=>{
        categoryes()
        .then(res=>{
            //console.log(res.data)
            
            setCategory(res.data) 
        })
    },[])

    let arrayForSort =[...selector.parts]
    
    
    let new_arrayForSort = arrayForSort
    arrayForSort = []
    new_arrayForSort.map((item,index)=>{
        
        let new_item = {...item, index:index}
        
        arrayForSort.push(new_item)
    })
    

    arrayForSort.sort((a:any, b:any)=> {
        return b.count - a.count
    })
    

    //---------------sortArray-----------------outputCategoryes------------------
    let sortCategoryes = arrayForSort.filter(item=>item.catagory === openCategory)
    
    return(
        <div className='zoneStorage'>
                    
            
            <div className='filter'>
                <select className='catagory' onChange={(e)=>setOpenCategory(e.target.value)}>
                    <option value={'default'}>Все категории</option>
                    {category.map((item:any, index:number)=>{
                        return <option key={index} value={item.title}>{item.title}</option>
                    })}
                </select>
                <button className='add' onClick={(e)=>view_addButton?setView_addButton(false):setView_addButton(true)}>
                    <Image src={plus} width='30' height='30' alt='addButton'/>
                </button>
                
            </div>
            <div className='zoneParts'>
            {!view_addButton?``:
                <AddPanel {...selector}/>}
    
            {openCategory !== 'default'?
            sortCategoryes.map((item:any, index:any)=>{
                return <Part part={item} key={index} index={item.index} id={selector.id}/>
            })
            :
            arrayForSort.map((item:any, index: any)=>{
                
                return  <Part part={item} key={index} index={item.index} id={selector.id}/>
            })}
            </div>
            
        </div>
    )
}