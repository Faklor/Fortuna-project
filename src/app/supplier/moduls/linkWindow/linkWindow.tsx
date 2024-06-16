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

export default function LinkWindow({part,visible,setVisible}:{part:any,visible:any,setVisible:any}){
    
    function getClass(){
        if(part.count === 0){
            return 'unvisible'
        }
        return 'visible'
    }

    return(
        <div className="linkWindow">
            <div className='other'>
                <Image src={organization} width={35} height={35} alt='организация' title='Название организации' className={getClass()}/>
                <p>{part.contact.name}</p>
            </div>
            <div className='other'>
                <Image src={link} width={35} height={35} alt='ссылка' title='Ссылка на источник(Где купили)' className={getClass()}/>
                <Link href={part.contact.link}>Перейти...</Link>
            </div>
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
    )
}