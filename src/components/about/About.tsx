import "./About.css"
// Import all the pictures from ../../assets/profile_pictures
import akhil from '../../assets/profile_pictures/akhil.jpeg'; 
import bryan from '../../assets/profile_pictures/bryan.jpeg';
import christina from '../../assets/profile_pictures/christina.jpeg';
import coleman from '../../assets/profile_pictures/coleman.jpeg';
import simon from '../../assets/profile_pictures/simon.jpeg';

const akhilLinkedin = "https://www.linkedin.com/in/akhil-gupta-tiktok/";
const bryanLinkedin = "https://www.linkedin.com/in/bryan-quandt-8a32367b/";
const christinaLinkedin = "https://www.linkedin.com/in/cjenq/";
const colemanLinkedin = "https://www.linkedin.com/in/colemanhindes/";
const simonLinkedin = "https://www.linkedin.com/in/simon-schoelzel/";


export function About() {
    // Return a div with all of the team's pictures from ../../assets/profile_pictures
    function Team() {
        return (
            <div className="team">
                <div className="profile">
                    <a href={akhilLinkedin} target="_blank" rel="noreferrer">
                        <p>Akhil</p>
                    </a>
                    <img src={akhil} alt="Akhil" />
                </div>
                <div className="profile">
                    <a href={bryanLinkedin} target="_blank" rel="noreferrer">
                        <p>Bryan</p>
                    </a>
                    <img src={bryan} alt
                    ="Bryan" />
                </div>
                <div className="profile">
                    <a href={christinaLinkedin} target="_blank" rel="noreferrer">
                        <p>Christina</p>
                    </a>
                    <img src={christina
                    } alt="Christina" />
                </div>
                <div className="profile">
                    <a href={colemanLinkedin} target="_blank" rel="noreferrer">
                        <p>Coleman</p>
                    </a>
                    <img src={coleman} alt
                    ="Coleman" />
                </div>
                <div className="profile">
                    <a href={simonLinkedin} target="_blank" rel="noreferrer">
                        <p>Simon</p>
                    </a>
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
                The app is currently in beta, so please report any bugs you find to the team <a href="mailto:akhilg1093@gmail.com" target="_blank" rel="noreferrer">here</a>.
            </p>
        </div>
    );
}