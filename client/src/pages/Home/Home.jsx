import { useContext } from 'react';
import { Appstate } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import LayOut from '../../Components/LayOut/LayOut';
import All_question from '../Question/All_question';
import classes from "./home.module.css"

function Home() {
    const user = useContext(Appstate);
    return (
        <LayOut>
            <div className={classes.home_container}>
                <div className={classes.home_upper}>
                    <button className={classes.btn}><Link className={classes.link} to={'/create-question'}>Ask question</Link></button>
                    <p>Welcome : {user.user.username}</p>
                </div>
                <All_question />
            </div>
        </LayOut>

    );
}

export default Home;
