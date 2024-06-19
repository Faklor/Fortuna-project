'use client'
import './addOrder.scss'
import Image from 'next/image'
//---------redux-----------------
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit  } from '@/store/slice/unit'
import { setOrder, updateOrder } from '@/store/slice/order'
//---------image-----------------
import linkImg from '@/res/link.svg'
import sum from '@/res/sum.svg'
import plus from '@/res/plusCount.svg'
import minus from '@/res/minus.svg'
import user from '@/res/user.svg'
import home from '@/res/home.svg'
import dateImg from '@/res/date.svg' 
//--------axios------------------
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function AddOrder(){
    //------------------redux--------------------
    const selectorPart = useAppSelector<any>(state => state.selectOrder.order)
    const selectorUnit = useAppSelector<any>(state => state.unit.unit)
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)
    const dispatch = useAppDispatch()
    //------------axios--------------------------
    async function getWorkers() {
        return await axios.get(`http://${URLMAINPC}:3000/api/workers`)
    }
    async function getteches() {
        return await axios.get(`http://${URLMAINPC}:3000/api/teches`)
    }
    async function sendOrder(id:number, date:any, worker:string, part:any) {
        return await axios.post(`http://${URLMAINPC}:3000/api/teches/addOrder`, { id:id, date:date, worker:worker, part:part})
    }
    async function post(id:string){
        return await axios.post(`http://${URLMAINPC}:3000/api/teches`, {id:id})
    }
    //----------------values---------------------
    let [list_workers, setList_workers]= useState<Array<object>>([])
    let [list_teches, setList_teches]= useState<Array<object>>([])

    let [one_worker, setWorker] = useState<string>()    
    let [one_tech, setTech] = useState<number>(0)

   
    let nowDate = new Date().getFullYear()  + '-' + ('0' + (new Date().getMonth()+1)).slice(-2)  + '-' + ('0' + new Date().getDate()).slice(-2) 

    let [date, setDate] = useState<string>(nowDate)

    
    
    
    //--------------send-------------------------
    useEffect(()=>{
        getWorkers()
        .then(res=>{
            setList_workers(res.data)

            //обработка
            setWorker(res.data[0].name)
        })

        getteches()
        .then(res=>{
            setList_teches(res.data)

            //обработка

            //setTech(res.data[0].id)
            //setTech(selectorUnit.id)
        })
        
    },[])

   

    return(
        <>
            {Object.keys(selectorPart).length !== 0?
                <div className='addOrder'>

                    <div className='part unShadow'>
                        <div  className='content'>
                            <div className='name'>
                                <Image src={linkImg} width={25} height={25} alt='Ссылка' className='unVisible' style={{backgroundColor:'#2564CF'}}/>
                                <p>{selectorPart.name}</p>
                            </div>
                        
                            <div className='sum'>
                                <Image src={sum} width={25} height={25} alt='Цена' className='unVisible'/>
                                <p>{selectorPart.sum} р.</p>
                            </div>
                        
                        </div>
                        <div className='count'>
                            <p className='countBlock'> {selectorPart.count} шт. </p>

                            <button  className='unVisible' onClick={()=>{

                                selectorUnit.parts.map((part:any, index:number)=>{
                                    
                                    if(part.name === selectorPart.name){
                                        let data:any = {method:'up', maxC:part.count}
                                        dispatch(updateOrder(data))   
                                    }
                                })
                                
                                
                                
                            }}><Image src={plus} width={20} height={20} alt='Добавить 1-ну запчасть' /></button>
                        
                            <button  className='unVisible' onClick={()=>{
                                let data:any = {method:'down', maxC:selectorPart.count}
                                dispatch(updateOrder(data))
                            }}><Image src={minus} width={15} height={15} alt='Удалить 1-ну запчасть' /></button>
                        </div>
                    </div>

                    <div className='date'>
                        <Image src={dateImg} width={35} height={35} alt='Работник'/>
                        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

                    </div>
                    
                    <div className='subdivision' onChange={(e:any)=>setTech(e.target.value)}>
                        {/* <Image src={} width={25} height={25} alt='Подразделение'/> */}
                        <Image src={home} width={35} height={35} alt='Работник'/>
                        <select onChange={(e:any)=>{setTech(e.target.value)}} >
                            {/* <option value={selectorUnit.id} selected>{selectorUnit.name}</option> */}
                            {list_teches.map((tech:any,index:number)=>{
                                //console.log(tech)
                                if(list_teches[0] === list_teches[index]){
                                    return <option key={index} value={selectorUnit.id} defaultValue={selectorUnit.id}>{selectorUnit.name}</option>
                                }
                                return <option key={index}  value={Number(tech.id)}>{tech.name}</option>
                            })}
                        </select>   
                    </div>
                    <div className='drivers'>
                        {/* <Image src={} width={25} height={25} alt='Подразделение'/> */}
                        <Image src={user} width={35} height={35} alt='Работник'/>
                        <select  onChange={(e)=>{setWorker(e.target.value)}}>
                            {list_workers.map((worker:any,index:number)=>{
                               
                                return <option key={index} defaultValue={worker.name} value={worker.name}>{worker.name}</option>
                            })}
                        </select>   
                    </div>
                    
                    <div className='controllers'>
                        <button onClick={()=>{
                            let objValue:any = {}
                            dispatch(setOrder(objValue))
                        }}>ОТМЕНА</button>
                        <button onClick={()=>{
                            //console.log(,date,String(one_worker), selectorPart)
                            let id = one_tech === 0?selectorUnit.id:one_tech
                            //console.log(id,date,String(one_worker), selectorPart)
                            sendOrder(id,date,String(one_worker), selectorPart)
                            .then(res=>{
                                post(id).then(res=>{
                                    let objValue:any = {}
                                    dispatch(setUnit(res.data))
                                    dispatch(setOrder(objValue))
                                })
                            })
                        }}>ДОБАВИТЬ</button>
                    </div>
                    
                </div>
            :<></>}
            
        </>
    )
}