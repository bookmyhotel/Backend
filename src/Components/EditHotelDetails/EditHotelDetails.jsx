
import styled from 'styled-components'
import { useParams } from 'react-router'
import { HotelData, createNewHotel, updateHotelDetails } from '../../Utils/HotelData'
import { useState, useEffect } from 'react'
import styles from "./EditHotelDetails.module.css"
import { HotelRoomsImages } from './HotelRoomsImages'
import { DUMMY_HOTEL } from '../../Utils/HotelData'
import { ProgressBar } from 'react-loader-spinner'

export const EditHotelDetails = ({ hotelData }) => {
    const param = useParams();
    const [hotelImage, setHotelImage] = useState([]);
    const [hotelVisitURL, setHotelVisitURL] = useState([]);
    const [hotel, setHotel] = useState(hotelData);
    const [images, setImages] = useState(hotelData?.imageList);
    const [url, setURL] = useState(hotelData?.url);
    const [loader, setLoader] = useState(false);

    const handleHotelDetailsSubmission = async (event) => {
        event.preventDefault();
        let newHotel = { ...hotel };
        newHotel.url = url;
        newHotel.images = images;
        newHotel.facilities =[hotel.breakFast];
        setLoader(true);
        if(param.id == "new"){
            await createNewHotel(newHotel);
        }else{
            newHotel.id = param.id;
            await updateHotelDetails(newHotel);
        }
        setLoader(false);
    }
    const handleEdit = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        let newHotel = {
            ...hotel
        }
        newHotel[name] = value;
        setHotel(newHotel);
    }
    const updateImages = (imgURL, index, multipleImages, loader) => {
        if(loader){
           return setLoader(true);
        }
        if (multipleImages) {
            let img = [...images];
            img[index] = imgURL;
            setImages(img);
        } else {
            setURL(imgURL);
        }
        setLoader(false);
    }
    useEffect(() => {
        setHotel(hotelData);
        let hotelImage = {
            "data_url": hotelData.url
        }
        let images = [];
        hotel.imageList.forEach((el) => {
            images.push({ "data_url": el })
        })
        setHotelImage([hotelImage]);
        setHotelVisitURL(images);
    }, [])
    return (
        <>
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
            <form className={styles.EditHotelDetails} id="hotelDetailsForm">
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h5>Add hotel image here ..</h5>
                    </div>
                    <HotelRoomsImages multipleImages={false} imageLists={hotelImage} updateImages={updateImages}/>
                </div>
                <div>
                    <div className={styles.Form}>
                        <div className={styles.name}>
                            <div>
                                <label htmlFor="name">Hotel Name</label>
                                <input type="text" id="name" name="name" placeholder="Hotel name.." value={hotel.name} onChange={handleEdit} />
                            </div>
                            <label htmlFor="name">City</label>
                            <input type="text" id="city" name="city" placeholder="Hotel city.." value={hotel.city} onChange={handleEdit} />
                            <label htmlFor="rooms">Total Rooms</label>
                            <input type="number" id="rooms" name="rooms" placeholder="Total rooms.." value={hotel.rooms} onChange={handleEdit} />
                            <label htmlFor="bedSize">Bed Type</label>
                            <select id="bedSize" name="bedSize" value={hotel.bedSize} onChange={handleEdit}>
                                <option value="3 bed">3 bed</option>
                                <option value="2 bed">2 bed</option>
                                <option value="1 bed">1 bed</option>
                            </select>
                            <label htmlFor="price">Charge Per Night in £</label>
                            <input type="number" id="price" name="price" placeholder="Charge per night.." value={hotel.price} onChange={handleEdit} />
                            <label htmlFor="discount">Discount % </label>
                            <input type="number" id="discount" name="discount" placeholder="Discounted charge per night.." value={hotel.discount} 
                            onInput={(e)=> e.target.value > 100 ? e.target.value = 100 : e.target.value}
                            onChange={handleEdit} max={100}/>
                        </div>
                        <h5>Break fast included?</h5>
                        <div className={styles.inputGroup}>
                            <input id="breakFastIncluded1" name="breakFast" type="radio" value={hotel.breakFast} onChange={handleEdit} />
                            <label htmlFor="breakFastIncluded1">Yes</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input id="breakFastIncluded2" name="breakFast" type="radio" value={hotel.breakFast} onChange={handleEdit} />
                            <label htmlFor="breakFastIncluded2">No</label>
                        </div>
                    </div>

                </div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h5> Add rooms sample here...</h5>
                    </div>
                    <HotelRoomsImages multipleImages={true} imageLists={hotelVisitURL} updateImages={updateImages} />
                </div>
                <div className={styles.submitButton}>
                    <button onClick={(event) => handleHotelDetailsSubmission(event)} type="button">Submit</button>
                </div>
            </form>
        </>
    )
}