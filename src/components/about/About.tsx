import "./About.css"
// Import all the pictures from ../../assets/profile_pictures
import akhil from '../../assets/profile_pictures/akhil.jpeg'; 
import bryan from '../../assets/profile_pictures/bryan.jpeg';
import christina from '../../assets/profile_pictures/christina.jpeg';
import coleman from '../../assets/profile_pictures/coleman.jpeg';
import juan from '../../assets/profile_pictures/juan.jpeg';
import simon from '../../assets/profile_pictures/simon.jpeg';

export function About() {
    // Return a div with all of the team's pictures from ../../assets/profile_pictures
    function Team() {
        return (
            <div className="team">
                <div className="profile">
                    <p>Akhil</p>
                    <img src={akhil} alt="Akhil" />
                </div>
                <div className="profile">
                    <p>Bryan</p>
                    <img src={bryan} alt
                    ="Bryan" />
                </div>
                <div className="profile">
                    <p>Christina</p>
                    <img src={christina
                    } alt="Christina" />
                </div>
                <div className="profile">
                    <p>Coleman</p>
                    <img src={coleman} alt
                    ="Coleman" />
                </div>
                <div className="profile">
                    <p>Juan</p>
                    <img src={juan} alt="Juan" />
                </div>
                <div className="profile">
                    <p>Simon</p>
                    <img src={simon} alt="Simon" />
                </div>
            </div>
        );
    }

    return (
        <div className="about">
            {Team()}
            <p>
                This is a web app that allows you to ask questions about climate change and get answers from the companies that are responsible for the emissions.
                <br />
                <br />
                The app is currently in beta, so please report any bugs you find to the team <a href="mailto:akhilg1093@gmail.com">here</a>.
            </p>
        </div>
    );
}