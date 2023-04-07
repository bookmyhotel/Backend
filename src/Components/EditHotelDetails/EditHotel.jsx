
import styled from 'styled-components'
import { Navbar } from '../Navbar/Navbar'
import FooterBlue from '../Footer/FooterBlue'
import { useParams } from 'react-router'
import { HotelData, getHotel } from '../../Utils/HotelData'
import { useState, useEffect } from 'react'
import { EditHotelDetails } from './EditHotelDetails'
import styles from "./EditHotelDetails.module.css"
import { ProgressBar } from 'react-loader-spinner'
const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 20px;
`
const Div = styled.div`
margin:0 ;

`
export const EditHotel = () => {
    const [loader, setLoader] = useState(false);
    const [hotel, setHotel] = useState();
    const dummyHotel = {
        name: null,
        city: null,
        availableRooms: null,
        price: null,
        bedSize: null,
        discount: null,
        breakFast: null,
        availability: true,
        cancelationPolicy: null,
        cancellation: null,
        distance: null,
        id: 'new',
        rating: null,
        reviews: null,
        url: null,
        view: null,
        imageList: []
    }
    const param = useParams()
    async function getHotelData() {
        if (param.id == 'new') {
            setHotel(dummyHotel);
        } else {
            setLoader(true);
            let res = await getHotel(param.id);
            setHotel(res);
            setLoader(false);
        }
    }
    useEffect(() => {
        getHotelData()
    }, [])
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
                    {hotel && <EditHotelDetails hotelData={param.id == 'new' ? dummyHotel : hotel} />}
                </Div>
            </Wrapper>
            <FooterBlue />

        </>
    )
}