import "./home.css"
import { Navbar, AddPost } from "../../Components"
export const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <AddPost />
        </div>
    );
}
