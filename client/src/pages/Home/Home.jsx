import { useContext } from 'react';
import { Appstate } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import All_question from '../Question/All_question';
function Home() {
    const user = useContext(Appstate);
    const navigate = useNavigate();

    const  handleLogout =() => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    }

    return (
        <div>
            <h1>Home</h1>
            <br />
            <br />
            <br />
            <h2>{user.user.username}</h2>
            <All_question />
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    );
}

export default Home;
