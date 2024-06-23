'use client'
import './page.scss'
import Image from 'next/image'
//----moduls------
import ZoneStorage from './moduls/zoneStorage'
import ZoneOutput from './moduls/zoneOutput'
import List from './moduls/list'
//-----image------
import supplier from '@/res/titlePage/supplier.svg'
import back from '@/res/titlePage/backgroundTitlePage.svg'


export default function Supplier(){
    
    
    

    return(
        <main className='supplier'>
            {/* <Image src={back} width={1000} height={800} alt='back' className='backImg'/> */}
            <List/>

            <div className="mainDiv">
                <div className='titleAndNav'>
                    <p>ИМЕЕТСЯ</p>
                    
                    <div className='rectangle'>
                        <Image src={supplier} width={80} height={80} alt='Логтоип поставщика' className='logo' priority={true}/>
                    </div>

                    <div/>

                    <p>ВЫДАНО</p>
                </div>
                

                <ZoneStorage/>

                <ZoneOutput/>
            </div>
            

            <div className='order'>

            </div>

            <div className='wait'>

            </div>
        </main>
    )
}