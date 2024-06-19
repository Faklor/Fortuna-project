'use client'
import './search.scss'
import Image from 'next/image'
import { useState } from 'react'
//----------res------------
import searchImg from '@/res/search.svg'
import clear from '@/res/badError.svg'
//----redux-----
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSearch } from '@/store/slice/search'

export default function Search(){

    //const [search, setSearch] = useState<string>('')
    //------------redux-------------------
    const dispatch = useAppDispatch()
    let search = useAppSelector<any>(state => state.search.search)


    return( 
        <div className='search'>
            <Image src={searchImg} width={35} height={35} alt='search'/>
            <input onChange={(e:any)=>{
                dispatch(setSearch(e.target.value))
                
            }} placeholder='Поиск' className='searchInput' value={search}/>
            {search !== ""?<Image src={clear} width={35} height={35} alt='clear' onClick={()=>{
                let data:any = ""
                dispatch(setSearch(data))
            }}/>:<></>}
        </div>
    )
}