'use client'
import './addPanel.scss'
import { useState,useRef, useEffect } from "react"
import axios from 'axios'
//--------------res-----------------
import error from '@/res/badError.svg'
import good from '@/res/goodError.svg'
import categoryImg from '@/res/category.svg'
import np from '@/res/name.svg'
import linkImg from '@/res/link.svg'
import number from '@/res/number.svg'
import organization from '@/res/organization.svg'
import sellNumber from '@/res/sellNumber.svg'
import sum from '@/res/sum.svg'
import count from '@/res/count.svg'
import dateImg from '@/res/date.svg'
import manufacturerImg  from '@/res/manufacturer.svg'
//----------next---------------------
import Image from 'next/image'
//----------redux--------------------
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit } from '@/store/slice/unit'
//---------url-----------------------
import url from '@/app/axios/URLs'




export default function AddPanel({id}:any){
    //==========state======================
    let [namePart, setNamePart] = useState<string>('')
    let [serialNumberPart, setSerialNumberPart] = useState<string>('')
    let [sellNumberPart, setSellNumberPart] = useState<string>('')
    let [countPart, setCountPart] = useState<string>('')
    let [sell, setSell] = useState<string>('')
    let [contact, setContact] = useState<string>('')
    let [link, setLink] = useState<string>('')
    let [date, setDate] = useState<string>('')
    let [manufacturer, setManufacturer] = useState<string>('')


    let [category, setCategory] = useState<Array<object>>([])
    let [inputCatagory, setInputCatagory] = useState<string>('')
    

    let errors :string[] = []
    //==========refs=======================
    //const refAddButton = useRef<HTMLButtonElement>(null)
    //==========redux======================
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)
    const selectorUnit = useAppSelector<any>(state => state.unit.unit)
    const dispatch  = useAppDispatch()

    
    function getStatus(errorData:number,state:string ){
        
        if(state.length >= errorData){    
            
            errors.push('bad')
            return <Image className='error' src={error} width={30} height={30} alt='Ошибка' title={`Не более ${errorData} символов`}/>
        }
        else if(state.length <= errorData && state.length !== 0){
            return <Image className='error' src={good} width={25} height={25} alt='Ошибка' title="Все хорошо"/>
        }
        else if(state.length === 0){
            
        }
        
        errors.push('bad') 
        
        return ''
        
        
    }
    
    async function sendData(id:number,category:string,namePart:string, serialNumberPart:string,sellNumberPart:string, countPart:string, sell:string,contact:string,link:string, manufacturer:string){

        return await axios.post(url.addPart, {id:id,catagory:category,name: namePart, serialNumber: serialNumberPart,sellNumber: sellNumberPart,count: Number(countPart),  sum:Number(sell),nameContact:contact,linkContact:link,manufacturer:manufacturer})
    }

    async function post(id:string){
        return await axios.post(url.teches, {id:id})
    }
    //------------------fs------------------------
    async function categoryes() {
        return await axios.get(url.catagoryes)
    }
    //--------------------------------------------
    useEffect(()=>{
        categoryes()
        .then(res=>{
            //console.log(res.data)
            
            setCategory(res.data)
        })
    },[])
    
    //----------------render----------------------
    return(
        <div className='addPanel'>
            
            <h2>Добавление запчасти</h2>
            
            <div className='inputZone'>
                <Image src={categoryImg} width={50} height={50} alt='Имя запчасти' className='prop'/>
                {/* <input type="text" placeholder="Категория" value={category} onChange={(e)=>setCategory(e.target.value)}/> */}
                {/* {getStatus(20, category)} */}
                <select onChange={e=>setInputCatagory(e.target.value)}>
                    <option>Выбрать</option>
                    {
                        category.map((item:any, index:number)=>{
                            return <option key={index} value={item.title}>
                                
                                {item.title}
                            </option>
                        })
                    }
                </select>   
            </div>
            <div className='inputZone'>
                <Image src={np} width={50} height={50} alt='Имя запчасти' className='prop'/>
                <input type="text" placeholder="Название" value={namePart} onChange={(e)=>setNamePart(e.target.value)}/>
                {/* {getStatus(20, namePart)} */}
            </div>
            <div className='inputZone'>
                <Image src={number} width={50} height={50} alt='Имя запчасти' className='prop'/>
                <input type="text" placeholder="Серийный номер" value={sellNumberPart} onChange={(e)=>setSellNumberPart(e.target.value)}/>
                {/* {getStatus(20, sellNumberPart)} */}
            </div>
            <div className='inputZone'>
                <Image src={sellNumber} width={50} height={50} alt='Имя запчасти' className='prop'/>
                <input type="text" placeholder="Товарный номер " value={serialNumberPart} onChange={(e)=>setSerialNumberPart(e.target.value)}/>
                {/* {getStatus(20, serialNumberPart)} */}
            </div>
            <div className='inputZone'>
                <Image src={count} width={50} height={50} alt='Имя запчасти' className='prop' title='Кол-во'/>
                <input type="number" placeholder="Кол-во" min='0'  value={countPart} onChange={(e)=>setCountPart(e.target.value)} title='Кол-во'/>
                
            </div>
            <div className='inputZone'>
                <Image src={sum} width={50} height={50} alt='Имя запчасти' className='prop' title='Цена'/>
                <input type="number" placeholder="Цена за шт." min='0'  value={sell} onChange={(e)=>setSell(e.target.value)} title='Цена'/>
               
            </div>
            <div className='inputZone'>
                <Image src={manufacturerImg} width={50} height={50} alt='Имя запчасти' className='prop'/>
                {/* <input type="text" placeholder="Производитель " value={manufacturer} onChange={(e)=>setManufacturer(e.target.value)}/> */}
                <select onChange={(e)=>setManufacturer(e.target.value)}>
                    <option>Выбрать</option>
                    <option>🇧🇾 Беларусь</option>
                    <option>🇨🇳 Китай</option>
                    <option>🇷🇺 Россия</option>
                    <option>🇩🇪 Германия</option>
                    <option>🇮🇹 Италия</option>
                    <option>🇺🇸 Америка</option>
                    <option>🇬🇧 Англия</option>
                </select>
                {/* {getStatus(20, serialNumberPart)} */}
            </div>
            <div className='inputZone'>
                <Image src={organization} width={50} height={50} alt='Имя запчасти' className='prop'/>
                <input type="text" placeholder="Название организации" value={contact} onChange={(e)=>setContact(e.target.value)}/>
                {/* {getStatus(20, contact)} */}
            </div>
            <div className='inputZone'>
                <Image src={linkImg} width={50} height={50} alt='Имя запчасти' className='prop'/>
                <input type="text" placeholder="Ссылка на источник" value={link} onChange={(e)=>setLink(e.target.value)}/>
                {/* {getStatus(100, link)} */}
            </div>
            

            {errors.length === 0?
                <button className='activeButton' onClick={()=>sendData(id,inputCatagory,namePart, serialNumberPart,sellNumberPart, countPart, sell,contact,link,manufacturer)
                    .then(res=>{
                        
                        post(id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    })
                }>ДОБАВИТЬ</button>
                :
                <button className='disableBytton'>ДОБАВИТЬ</button>   
            }      
        </div>
    )
}