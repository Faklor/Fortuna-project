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
    const selectorPart = useAppSelector<object>(state => state.selectOrder.order)
    const selectorUnit = useAppSelector<object>(state => state.unit.unit)
    const dispatch = useAppDispatch()

    let array = selectorUnit.orders
    let group = {}


    if(array){
        array = [...selectorUnit.orders]
       
        
        let sortArray =  array.sort((a:string,b:string)=>{
            return new Date(b.date) - new Date(a.date)
        })
        
        group = Object.groupBy(sortArray, ({date}:{date:any})=> date)


    }
    
    
    return(
        <div className='zoneOutput'>
            <AddOrder/>
            <div className='zoneOrders'>
                {selectorUnit.orders? 
                   
                    Object.entries(group).map((item:any,index:number)=>{
                        //console.log(item)
                        return <Order {...item} key={index}/>
                    })
                    // selectorUnit.orders.map((order:any, index:number)=>{
                    //     //console.log(order)
                    //     return <Order {...order} key={index}/>
                    // })
                    :
                <></>}
                
                
            </div>     
        </div>
    )
}