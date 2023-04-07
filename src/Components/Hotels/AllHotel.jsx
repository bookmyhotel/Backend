import { useState, useEffect } from "react";
import { AllHotelData, HotelData } from "../../Utils/HotelData";
import FooterBlue from "../Footer/FooterBlue";
import { Navbar } from "../Navbar/Navbar";
import { DataComponent } from "../SearchData/DataComponent";
import styles from "../SearchPage/SearchRequest.module.css"
import { Link } from "react-router-dom";
import { ProgressBar } from 'react-loader-spinner';

export const AllHotels = () => {

    const [showData, setShowData] = useState([])
    const [loader, setLoader] = useState(true);

    async function allHotels() {
        setLoader(true);
        let res = await AllHotelData();
        setLoader(false);
        setShowData(res.result)
        console.clear();
        console.log(res.result);
        return res;
    }
    const handleHotelDelete = () => {
        allHotels();
    }
    useEffect(() => {
        allHotels()
    }, [])
    return <>
        <div>
            <Navbar />
        </div>
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
        <div className={styles.button} style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
            <Link to="/edit/new" className={styles.Link}>Add new Hotel</Link>
        </div>
        <div className={styles.serachPageContainer} style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.hotelListContainer} >
                {  
                    showData.map((e, i) => {
                        return <DataComponent url={e.url}
                            key={e.id}
                            name={e.name} city={e.city} distance={e.distance}
                            bedSize={e.bedSize}
                            facilities={e.facilities}
                            review={e.review}
                            rating={e.rating}
                            breakFast={e.breakFast}
                            availability={e.availability}
                            availableRooms={e.availableRooms}
                            price={e.rooms.price}
                            discount={(Number(e.rooms.price) - Number(e.rooms.discount) * Number(e.rooms.price) / 100)}
                            id={e.id}
                            view={e.view}
                            handleHotelDelete={handleHotelDelete}
                        />


                    })
                }
            </div>
        </div>

        <FooterBlue />

    </>
}