import React from 'react'
import footerImg from "../../assets/img/footerlogo.png"
import { Link } from 'react-router-dom'
import classes from './footer.module.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <div className={classes.footer_container}>
            <div className={classes.socialmedia}>
                <img src={footerImg} alt="" />
                <div >
                    <ul>
                        <li><InstagramIcon /></li>
                        <li><FacebookIcon /></li>
                        <li><YouTubeIcon /></li>
                    </ul>
                </div>
            </div>
            <div>
                <h3>Useful Link</h3>
                <div>
                    <ul>
                        <li>
                            <Link className={classes.link}>Term of service</Link>
                        </li>
                        <li>
                            <Link className={classes.link}>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h3>contact info</h3>
                <div>
                    <ul>
                        <li>
                            support@evangadi.com
                        </li>
                        <li>
                            +1-202-386-2702
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
