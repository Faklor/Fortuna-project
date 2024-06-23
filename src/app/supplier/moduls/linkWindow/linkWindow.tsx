'use client'
import './linkWindow.scss'
import Image from 'next/image'
import Link from 'next/link'
//--------------res-------------------
import organization from '@/res/organization.svg'
import link from '@/res/link.svg'
import number from '@/res/number.svg'
import sellNumber from '@/res/sellNumber.svg'
import manufacturerImg from '@/res/manufacturer.svg'

export default function LinkWindow({part,visible,setVisible, visibleEdit, updatePart,index, id}:{part:any,visible:any,setVisible:any, visibleEdit:boolean, updatePart:any, index:number, id:any}){
    
    function getClass(){
        if(part.count === 0){
            return 'unvisible'
        }
        return 'visible'
    }
    console.log(part)

    return(
        <>{!visibleEdit?<div className="linkWindow">
            {part.contact.name?<div className='other'>
                <Image src={organization} width={35} height={35} alt='организация' title='Название организации' className={getClass()}/>
                <p>{part.contact.name}</p>
            </div>
            :
            ''}
            {part.contact.link?<div className='other'>
                <Image src={link} width={35} height={35} alt='ссылка' title='Ссылка на источник(Где купили)' className={getClass()}/>
                <Link href={part.contact.link}>Перейти...</Link>
            </div>
            :
            ''}
            {part.serialNumber?<div className='other'>
                    <Image src={number} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                    <p>{part.serialNumber}</p>
                </div>
            :
            ''} 
            
            {part.sellNumber?<div className='other'>
                    <Image src={sellNumber} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                    <p>{part.sellNumber}</p>
                </div>
            :
            ''} 

            {part.manufacturer?<div className='other'>
                    <Image src={manufacturerImg} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                    <p>{part.manufacturer}</p>
                </div>
            :
            ''}
            <button onClick={()=>setVisible(false)}>СВЕРНУТЬ</button>
        </div>
        :<div className="linkWindow">
            <div className='other'>
                <Image src={organization} width={35} height={35} alt='организация' title='Название организации' className={getClass()}/>
                <input type='text' defaultValue={part.contact.name} onChange={(e:any)=>{
                 
                    if(!part.contact.name){
                        part.contact  = {
                            name:e.target.value
                        }
                    }
                    else{
                        part.contact  = {
                            name:e.target.value
                        }

                    }
                    
                    updatePart(id, index, {name:'contact.name',data:part.contact.name})
                    .then((res:any)=>{
                        console.log(res)
                    })
                }}/>
            </div>
            <div className='other'>
                <Image src={link} width={35} height={35} alt='ссылка' title='Ссылка на источник(Где купили)' className={getClass()}/>
                <input type='text' defaultValue={part.contact.link} onChange={(e:any)=>{
                    if(!part.contact.link){
                        part.contact  = {
                            link:e.target.value
                        }
                    }
                    else{
                        part.contact  = {
                            link:e.target.value
                        }
                    }
                    updatePart(id, index, {name:'contact.link',data:part.contact.link})
                    .then((res:any)=>{
                        console.log(res)
                    })
                }}/>
            </div>
            <div className='other'>
                <Image src={number} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                <input type='text' defaultValue={part.serialNumber} onChange={(e:any)=>{
                    if(!part.serialNumber){
                        part.serialNumber = e.target.value
                    }
                    else{
                        part.serialNumber = e.target.value
                    }
                    updatePart(id, index, {name:'serialNumber',data:part.serialNumber})
                    .then((res:any)=>{
                        console.log(res)
                    })
                }}/>
            </div>
            <div className='other'>
                <Image src={sellNumber} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                <input type='text' defaultValue={part.sellNumber} onChange={(e:any)=>{
                    if(!part.sellNumber){
                        part.sellNumber = e.target.value
                    }
                    else{
                        part.sellNumber = e.target.value
                    }
                    updatePart(id, index, {name:'sellNumber',data:part.sellNumber})
                    .then((res:any)=>{
                        console.log(res)
                    })
                }}/>
            </div>
            <div className='other'>
                <Image src={manufacturerImg} width={35} height={35} alt='Добавить 1-ну запчасть' className={getClass()}/>
                <input type='text' defaultValue={part.manufacturer} onChange={(e:any)=>{
                    if(!part.manufacturer){
                        part.manufacturer = e.target.value
                    }
                    else{
                        part.manufacturer = e.target.value
                    }
                    updatePart(id, index, {name:'manufacturer',data:part.manufacturer})
                    .then((res:any)=>{
                        console.log(res)
                    })
                }}/>
            </div>

            <button onClick={()=>setVisible(false)}>СВЕРНУТЬ</button>
        </div>}</>
    )
}