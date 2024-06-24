'use client'
import './part.scss'
import Image from 'next/image'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
//----------------res----------------------
import categoryImg from '@/res/category.svg'
import linkImg from '@/res/link.svg'
import plus from '@/res/plusCount.svg'
import minus from '@/res/minus.svg'
import sum from '@/res/sum.svg'

import manufacturerImg  from '@/res/manufacturer.svg'
import number from '@/res/number.svg'
import sellNumber from '@/res/sellNumber.svg'

//===menu======
import send from '@/res/send.svg'
import deleteImg from '@/res/delete.svg'
import edit from '@/res/edit.svg'
//---module-----
import LinkWindow from './linkWindow/linkWindow'
//----redux-----
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUnit } from '@/store/slice/unit'
import { setOrder, updateOrder } from '@/store/slice/order'
//-----url------
import url from '@/app/axios/URLs'


export default function Part({part,index,id}:any){
    
    //------------state-------------------
    const [menu, setMenu] = useState<boolean>(false)
    let [category, setCategory] = useState<Array<object>>([])
    let [visibleLinkWindow, setVisibleLinkWindow] = useState<boolean>(false)
    let [visibleEdit, setVisibleEdit] = useState<boolean>(false)

    //------------redux-------------------
    const dispatch = useAppDispatch()
    let selectorPart = useAppSelector<any>(state => state.selectOrder.order)
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)

    //-----------editValues---------------
    

    //-----------------function-----------
    async function send_plus_Count(id:any,index_of_part:number,count:number){
        return await axios.post(url.addCount, {id:id, index_of_part:index_of_part, count:count})
    }
    async function send_delete_Count(id:any,index_of_part:number,count:number){
        return await axios.post(url.deleteCount, {id:id, index_of_part:index_of_part, count:count})
    }
    async function post(id:string){
        return await axios.post(url.teches, {id:id})
    }
    async function deletePart(id:number,part:object){
        return await axios.post(url.deletePart, {id:id,part:part})
    }
    async function updatePart(id:any, index_of_part:any, itemEdit:any) {
        return await axios.post(url.updatePart, {id:id, index_of_part:index_of_part, itemEdit:itemEdit})
    }
    //------------------fs------------------------
    async function categoryes() {
        return await axios.get(url.catagoryes)
    }
    
    //--------------------------------------------
    //-----------operations---------------
    selectorPart = part
    //-------------effect-----------------
    useEffect(()=>{
        categoryes()
        .then(res=>{
            //console.log(res.data)
            
            setCategory(res.data)
        })
    },[])
   
    //------------redner------------------
    return(
        <>
       
        {part.count === 0?
            <div className='part' onClick={(e:any)=>{
                
                    if(!menu && e.target.className === "part" || e.target.className === "category" || e.target.className === "sum" || e.target.className === "linkWindow" || e.target.className === "other" && e.target.className !== "visible"){
                        setMenu(true)
                    }
                    else{
                        setMenu(false)
                    }   
                
                
                }}>
                {menu?<div className='part_display_none active'>
                    <button onClick={()=>{
                        deletePart(id, part).then(res=>
                            post(id).then(res=>{
                                dispatch(setUnit(res.data))
                            })
                        )
                    }}><Image src={deleteImg} width={55} height={55} alt='Удалить запчасть' title='Удалить запчасть'/></button>
                    <button onClick={()=>{
                        visibleEdit?setVisibleEdit(false):setVisibleEdit(true)
                    }}><Image src={edit} width={55} height={55} alt='Редактировать запчасть' title='Редактировать запчасть'/></button>
                    
                </div>
                :<></>}
                {/* <div className='part_display_none not_active' onClick={()=>{
                
                }}/> */}
             
                <div className='category'>
                    {/* <Image src={categoryImg} width={55} height={55} alt='Категория' className='unVisible'/> */}
                    {category.map((item:any, index:any)=>{
                        if(part.catagory === item.title){
                            return <Image src={`./categoryes/${item.file}`} width={55} height={55} alt='Категория' className='unVisible' key={index}/>
                        }
                        
                    })}
                        
                </div>
                <div  className='content'>
                    <div className='name'>
                        <Image src={linkImg} width={25} height={25} alt='Ссылка' className='unVisible' onClick={()=>{
                            if(visibleLinkWindow){
                                setVisibleLinkWindow(false)
                            }
                            else{
                                setVisibleLinkWindow(true)
                            }
                        }}/>
                        
                        
                        {visibleEdit?<input type='text' defaultValue={part.name} onChange={(e:any)=>{
                            part.name = e.target.value
                            updatePart(id, index, {name:'name',data:part.name})
                            .then(res=>{
                                console.log(res)
                            })
                        }}/>
                        :
                        <p>{part.name}</p>}
                    </div>
                    
                    <div className='sum'>
                        <Image src={sum} width={25} height={25} alt='Цена' className='unVisible'/>
                        
                        {visibleEdit?<input className='num'  type='number' defaultValue={part.sum} onChange={(e:any)=>{
                            part.sum = e.target.value

                            updatePart(id, index, {name:'sum',data:Number(part.sum)})
                            .then(res=>{
                                console.log(res)
                            })
                        }}/>
                        :
                        <p>{part.sum}</p>}
                    </div>
                    
                    {/* <Image src={number} width={25} height={25} alt='Номер запчасти'/> 
                    <p>{item.serialNumber} </p>
                    <Image src={sellNumber} width={25} height={25} alt='Номер запчасти'/>
                    <p>{item.sellNumber}</p> */}
                </div>
                <div className='count'>
                    {visibleEdit?<input className='num' type='number' defaultValue={part.count} onChange={(e:any)=>{
                        part.count = e.target.value
                        updatePart(id, index, {name:'count',data:Number(part.count)})
                        .then(res=>{
                            console.log(res)
                        })
                    }}/>
                    :
                    <p className='countBlock'>{selectorPart.count} шт. </p>} 
                    
                    <button  className='unVisible' onClick={()=>{
                        
                        send_plus_Count(id,index,part.count).then(res=>{
                            
                            post(id).then(res=>{
                                dispatch(setUnit(res.data))
                            })
                        })
                    }}><Image src={plus} width={20} height={20} alt='Добавить 1-ну запчасть' /></button>
                    
                    <button  className='unVisible' ><Image src={minus} width={15} height={15} alt='Удалить 1-ну запчасть' /></button>
                    
                </div>
                <div className='otherData'>
                    {visibleLinkWindow?<LinkWindow part={part} visible={visibleLinkWindow} setVisible={setVisibleLinkWindow} visibleEdit={visibleEdit} updatePart={updatePart} index={index} id={id}/>:<></>}
                     
                    
                </div>
            
        </div>    
        /*-------------------visible-------------------------------------------------*/
        :
        <div className='part' onClick={(e:any)=>{
                if(!menu && e.target.className === "part" || e.target.className === "category" || e.target.className === "sum" || e.target.className === "linkWindow" || e.target.className === "other" && e.target.className !== "visible"){
                    setMenu(true)
                }
                else{
                    setMenu(false)
                }   
                
                
            }}>
            {menu?<div className='part_display_none active'>
                <button onClick={()=>{
                    deletePart(id, part).then(res=>
                        post(id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    )

                }}><Image src={deleteImg} width={55} height={55} alt='Удалить запчасть' title='Удалить запчасть' /></button>
                <button onClick={()=>{
                    
                    visibleEdit?setVisibleEdit(false):setVisibleEdit(true)

                }}><Image src={edit} width={55} height={55} alt='Редактировать запчасть' title='Редактировать запчасть'/></button>
                <button onClick={()=>{
                    
                    dispatch(setOrder(part))

                }}><Image src={send} width={55} height={55} alt='Выдать запчасть' title='Выдать запчасть'/></button>
            </div>
            :<></>}
            
             
            <div className='category'>
                    
                {/* <Image src={categoryImg} width={55} height={55} alt='Категория' className='visible'/> */}
                {category.map((item:any, index:any)=>{
                        if(part.catagory === item.title){
                            return <Image src={`./categoryes/${item.file}`} width={55} height={55} alt='Категория' className='visible' key={index}/>
                        }
                        
                })}
                        
            </div>
            <div  className='content'>
            <div className='name'>
                        
                <Image src={linkImg} width={25} height={25} alt='Ссылка' className='visible' onClick={()=>{
                            if(visibleLinkWindow){
                                setVisibleLinkWindow(false)
                            }
                            else{
                                setVisibleLinkWindow(true)
                            }
                        }}/>
                        
                {visibleEdit?<input type='text' defaultValue={part.name} onChange={(e:any)=>{
                    part.name = e.target.value
                    updatePart(id, index, {name:'name',data:part.name})
                    .then(res=>{
                        console.log(res)
                    })
                }}/>
                :
                <p>{part.name}</p>}
            </div>
                    
            <div className='sum'>
                        
                <Image src={sum} width={25} height={25} alt='Цена' className='visible'/>
                {visibleEdit?<input className='num'  type='number' defaultValue={part.sum} onChange={(e:any)=>{
                    part.sum = e.target.value

                    updatePart(id, index, {name:'sum',data:Number(part.sum)})
                    .then(res=>{
                        console.log(res)
                    })
                }}/>
                :
                <p>{part.sum}</p>}
            </div>
                    
                    {/* <Image src={number} width={25} height={25} alt='Номер запчасти'/> 
                    <p>{item.serialNumber} </p>
                    <Image src={sellNumber} width={25} height={25} alt='Номер запчасти'/>
                    <p>{item.sellNumber}</p> */}
            </div>
            <div className='count'>
                
                {visibleEdit?<input className='num' type='number' defaultValue={part.count} onChange={(e:any)=>{
                    part.count = e.target.value
                    updatePart(id, index, {name:'count',data:Number(part.count)})
                    .then(res=>{
                        console.log(res)
                    })
                }}/>
                :
                <p className='countBlock'>{selectorPart.count} шт. </p>}    
                    
                <button  className='default' onClick={()=>{
                        
                    send_plus_Count(id,index,part.count).then(res=>{
                        
                        post(id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    })
                }}><Image src={plus} width={20} height={20} alt='Добавить 1-ну запчасть'/></button>
                <button className='visible' onClick={()=>{
                    send_delete_Count(id,index,part.count).then(res=>{
                        post(id).then(res=>{
                            dispatch(setUnit(res.data))
                        })
                    })
                }}><Image src={minus} width={15} height={15} alt='Удалить 1-ну запчасть' /></button>
                    
            </div>

            <div className='otherData'>
                {visibleLinkWindow?<LinkWindow part={part} visible={visibleLinkWindow} setVisible={setVisibleLinkWindow} visibleEdit={visibleEdit} updatePart={updatePart} index={index} id={id}/>:<></>}
                        
            </div>
            
        </div>    
        }
        
        </>
        
    )
}