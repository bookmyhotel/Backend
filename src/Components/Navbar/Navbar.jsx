import styles from "./Navbar.module.css"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { User } from "../UserData/UserData";
const Tabs = styled.li`
cursor: pointer;
padding-left: 8px;
padding-right: 12px;
text-align: center;
padding-bottom: 10px;
border-bottom:${props => (props.tab === props.t) ? "2px solid white;" : "none"};
font-weight:${props => (props.tab === props.t) ? "500" : "none"};
font-size:${props => (props.tab === props.t) ? "14px" : "13px"};
`
export const Navbar = () => {
    const [tab, setTabs] = useState(1);
    const [user, setUser] = useState({});

    useEffect(() => {
        let data = User();
        if (data.email) {
            setUser(User())
        }
        else {
            setUser(false)
        }
    }, [])



    return <> <div className={styles.main} >
        <div className={styles.navbarContainer}>
            <div className={styles.navbarUpperSection}>
                <div className={styles.logo}>
                    <Link to="/">
                      <p><span>BookMyHotel</span><span>.com</span></p>
                    </Link>
                </div>
                <div className={styles.navbarUpperSectionItems}>
                    <ul>
                        <li className={styles.inr}>
                            GBP(₤)
                        </li>
                        <li className={styles.indianFlag}>
                            <img src="https://e7.pngegg.com/pngimages/107/894/png-clipart-london-flag-of-the-united-kingdom-zazzle-flag-of-england-england-flag-world.png" alt="" />
                        </li>
                        <li>
                            <svg className={styles.questionIcon} height="24" width="24" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0zM12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zM22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z"></path></svg>
                        </li>
                        <li className={styles.propertyList}>
                            <button>List your property</button>
                        </li>
                        {
                            !user && <li className={styles.signButton}>
                                <Link to="/register">
                                    <button>Register</button>
                                </Link>
                            </li>}
                        {
                            !user && <li className={styles.signButton}>
                                <Link to="/login">
                                    <button>Sign in</button>
                                </Link>

                            </li>
                        }
                        {
                            user && <Profile />
                        }

                    </ul>

                </div>
            </div>
            <div className={styles.navbarLowerSection}>
                <ul>
                    <Tabs onClick={() => setTabs(1)} t={1} tab={tab}>

                        <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path></svg>
                        <Link to="/" className={styles.Link}>

                            <p className={styles.text} >

                                Stays

                            </p>
                        </Link>


                    </Tabs>

                    <Tabs onClick={() => setTabs(2)} t={2} tab={tab}>
                        <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M20.505 7.5l-15.266.022.672.415-1.1-2.2a.75.75 0 0 0-.638-.414l-2.293-.1C.82 5.228-.003 6.06.003 7.083c.002.243.051.484.146.709l2.072 4.68a2.947 2.947 0 0 0 2.701 1.778h4.043l-.676-1.075-2.484 5.168A1.831 1.831 0 0 0 7.449 21h2.099a1.85 1.85 0 0 0 1.419-.664l5.165-6.363-.582.277h4.956c1.82.09 3.399-1.341 3.49-3.198l.004-.134a3.426 3.426 0 0 0-3.44-3.419l-.074.001zm.02 1.5h.042a1.924 1.924 0 0 1 1.933 1.914l-.002.065a1.866 1.866 0 0 1-1.955 1.772l-4.993-.001a.75.75 0 0 0-.582.277l-5.16 6.355a.346.346 0 0 1-.26.118h-2.1a.336.336 0 0 1-.3-.49l2.493-5.185a.75.75 0 0 0-.676-1.075H4.924a1.45 1.45 0 0 1-1.328-.878l-2.07-4.676a.35.35 0 0 1 .326-.474l2.255.1-.638-.415 1.1 2.2a.75.75 0 0 0 .672.415L20.507 9zM16.323 7.76l-2.992-4.02A1.851 1.851 0 0 0 11.85 3H9.783a1.85 1.85 0 0 0-1.654 2.672l1.439 2.91a.75.75 0 0 0 1.344-.664L9.472 5.007a.351.351 0 0 1 .312-.507h2.066a.35.35 0 0 1 .279.14l2.99 4.017a.75.75 0 1 0 1.203-.896z"></path></svg>
                        <p className={styles.text}>
                            Flights
                        </p>
                    </Tabs>


                    <Tabs onClick={() => setTabs(3)} t={3} tab={tab}>
                        <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M6.306 17.25a8.25 8.25 0 1 1 11.69-7.502.75.75 0 1 0 1.5 0A9.75 9.75 0 0 0 13.812.889C8.917-1.356 3.13.791.884 5.685-1.36 10.58.786 16.367 5.68 18.613a.75.75 0 0 0 .626-1.364zM3.756 3.5l5.28 2a.75.75 0 0 1 .475.851l-.313 1.57a.75.75 0 0 1-.554.58l-2.08.518a.75.75 0 0 0-.514.45l-1.154 2.884a2.242 2.242 0 0 1-.84 1.037l-1.84 1.263a.75.75 0 1 0 .85 1.236l1.83-1.257a3.731 3.731 0 0 0 1.393-1.722l1.153-2.884-.514.449 2.079-.52a2.25 2.25 0 0 0 1.661-1.74l.314-1.57a2.25 2.25 0 0 0-1.417-2.548l-5.277-2a.75.75 0 1 0-.532 1.403zm11.565-.57l-1.467 2.926a2.25 2.25 0 0 0-.122 1.718l.557 1.663a.75.75 0 1 0 1.422-.476L15.154 7.1a.75.75 0 0 1 .041-.572l1.466-2.924a.75.75 0 1 0-1.34-.672zm7.175 16.192v2.625a.75.75 0 0 1-.75.75h-10.5a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 .75.75v2.625zm1.5 0v-2.625a2.25 2.25 0 0 0-2.25-2.25h-10.5a2.25 2.25 0 0 0-2.25 2.25v5.25a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-2.625zm-12-4.125v8.25a.75.75 0 0 0 1.5 0v-8.25a.75.75 0 0 0-1.5 0zm7.5 0v8.25a.75.75 0 0 0 1.5 0v-8.25a.75.75 0 0 0-1.5 0zm-4.5.002v-.75a1.5 1.5 0 0 1 3 0V15a.75.75 0 0 0 1.5 0v-.75a3 3 0 1 0-6 0V15a.75.75 0 0 0 1.5 0z"></path></svg>
                        <p className={styles.text}>
                            Flight + Hotel
                        </p>
                    </Tabs>
                    <Tabs onClick={() => setTabs(4)} t={4} tab={tab}>

                        <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M21.75 15.5V8a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zm-16.5 0V8a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM3 8.75h3a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0 0 1.5zm6.75 6.75v-6a.75.75 0 0 1 1.5 0v6a.75.75 0 0 0 1.5 0v-6a2.25 2.25 0 0 0-4.5 0v6a.75.75 0 0 0 1.5 0zM9 13.25h3a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5zm5.304-4.971l3 7.5a.75.75 0 0 0 1.392-.557l-3-7.5a.75.75 0 0 0-1.392.557zm3-.558l-3 7.5a.75.75 0 0 0 1.392.557l3-7.5a.75.75 0 0 0-1.392-.557zM.75 5h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zm0 15h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5z"></path></svg>
                        <p className={styles.text}>
                            Airport taxis
                        </p>

                    </Tabs>
                    {user && user.role == "ADMIN" && <Tabs onClick={() => setTabs(5)} t={5} tab={tab}>
                    <svg  className={styles.svgIcons} fill= "white" height="24" viewBox="0 96 960 960" width="24"><path d="M427 790h106V629h161V523H533V362H427v161H266v106h161v161Zm53 232q-92.64 0-174.467-34.604-81.828-34.603-142.077-94.852-60.249-60.249-94.852-142.077Q34 668.64 34 576q0-92.896 34.662-174.449 34.663-81.553 95.175-141.942 60.511-60.389 142.075-94.999Q387.476 130 480 130q92.886 0 174.476 34.593T796.44 259.56q60.374 60.374 94.967 141.99Q926 483.167 926 576.083q0 92.917-34.61 174.243t-94.999 141.837q-60.389 60.512-141.942 95.174Q572.896 1022 480 1022Zm-.229-136q130.742 0 220.485-89.515Q790 706.971 790 576.229q0-130.742-89.515-220.485Q610.971 266 480.229 266q-130.742 0-220.485 89.515Q170 445.029 170 575.771q0 130.742 89.515 220.485Q349.029 886 479.771 886ZM480 576Z"/></svg>
                          <Link to="/allhotels" style={{color:"white", textDecoration:"none"}}> 
                           <p className={styles.text}>
                               Manage Hotels
                          </p>
                         </Link>
                    </Tabs>}
                    { <Tabs onClick={() => setTabs(6)} t={6} tab={tab}>
                    <svg  className={styles.svgIcons} fill= "white" height="24" viewBox="0 96 960 960" width="24">
                       <path d="M874 362v482q0 53-36.5 89.5T748 970H212q-53 0-89.5-36.5T86 844V308q0-53 36.5-89.5T212 182h482l180 180Zm-126 53L641 308H212v536h536V415ZM480 804q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM252 508h360V348H252v160Zm-40-93v429-536 107Z"/>
                        </svg>
                          <Link to="/booking" style={{color:"white", textDecoration:"none"}}> 
                           <p className={styles.text}>
                               My Bookings
                          </p>
                         </Link>
                    </Tabs>}
                </ul>
            </div>
        </div>
    </div>
    </>
}