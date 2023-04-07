
import styled from 'styled-components'
import { TopSection } from './TopSection/TopSection'
import { TitleInfo } from './TittleInfo/TittleInfo'
import { AllIcons } from './AllIcons/AllIcons'
import { Availability } from './Avaliablity/Availability'
import { Navbar } from '../../Navbar/Navbar'
import FooterBlue from '../../Footer/FooterBlue'
import { SearchRequest } from '../../SearchPage/SearchRequest'
import { useParams } from 'react-router'
import { HotelData, getHotel } from '../../../Utils/HotelData'
import { useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import styles from "./HotelDetails.module.css"
import { useEffect } from 'react'
const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 20px;
`
const Div = styled.div`
margin:0 ;

`
export const HotelDetails = () => {
    const param = useParams()
    const [loader, setLoader] = useState(false);
    const [, setShowData] = useState("")
    const [hotel, setHotel] = useState(HotelData[0]);
    const sendData = HotelData.filter((el) => {
        return el.id === Number(param.id)
    })
   async function getHotelData(){
     setLoader(true);
     let res = await getHotel(param.id);
     console.clear();
     console.log(res);
     setHotel(res);
     setLoader(false);
    }
    useEffect(()=>{
        getHotelData()
    },[])
    return (
        <>
            <Navbar />
            {loader && <div className={styles.loader}>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='#003580'
                    barColor='#006FBF'
                />
            </div>}
            <Wrapper>
                <Div>
                    <TopSection />
                    <TitleInfo type="hotel" name={`${hotel.name}`}
                        address={`${hotel.city}`}
                        images={hotel.imageList}
                    />

                    <AllIcons />

                    <Availability hotel={hotel} />



                </Div>
            </Wrapper>
            <FooterBlue />

        </>
    )
}