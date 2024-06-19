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

    //--------------------value------------------
    let months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
    let days = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ']
    let array:any = selectorUnit.orders
    let group:any = {}


    if(array){
        array = [...selectorUnit.orders]
       
        
        let sortArray:any =  array.sort((a:any,b:any)=>{
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        let sort_days:any[] = []
        sortArray.forEach((item:any)=>{
            console.log(item)
            let view_date:any = {
                year:String(new Date(item.date).getFullYear())+' г.',
                month:'',
                day:{
                    name:'',
                    number:String(new Date(item.date).getDate())
                }
            }
            //operations
            months.forEach((month:string,index:number)=>{
                if(index === new Date(item.date).getMonth()){
                    view_date.month = month
                }
            })
            
            days.forEach((dayName:string,index:number)=>{
                if(index === new Date(item.date).getDay()){
                    view_date.day.name = dayName
                }
            })
            
            //==========
            
            sort_days.push({date:`(${view_date.day.name}) ${view_date.day.number} ${view_date.month} ${view_date.year}`,worker:item.worker,part:item.part})
            
        })

        
        group = Object.groupBy(sort_days, ({date}:{date:any})=> date)
        

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