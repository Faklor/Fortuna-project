'use client'
import React, {useState} from 'react'
import './zoneOutput.scss'
//--------moduls------------
import AddOrder from './addOrder'
import Order from './order/order'
//---------redux-----------------
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit  } from '@/store/slice/unit'
import { setOrder, updateOrder } from '@/store/slice/order'


export default function ZoneOutput(){
    //------------------redux--------------------
    const selectorPart = useAppSelector<any>(state => state.selectOrder.order)
    const selectorUnit = useAppSelector<any>(state => state.unit.unit)
    const dispatch = useAppDispatch()

    let array:any = selectorUnit.orders
    let group:any = {}


    if(array){
        array = [...selectorUnit.orders]
       
        
        let sortArray:any =  array.sort((a:any,b:any)=>{
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        
        group = Object.groupBy(sortArray, ({date}:{date:any})=> date)


    }
    
    
    return(
        <div className='zoneOutput'>
            <AddOrder/>
            <div className='zoneOrders'>
                {selectorUnit.orders? 
                   
                    Object.entries(group).map((item:any,index:number)=>{
                       
                        return <Order {...item} key={index}/>
                    })
                    :
                <></>}
                
                
            </div>     
        </div>
    )
}