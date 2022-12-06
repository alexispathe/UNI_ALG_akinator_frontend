import { AiOutlineHome } from "react-icons/ai";

export const Header = ({btnHome}) => {
    return (
        <>
            <div onClick={btnHome} className="home-icon">
                <AiOutlineHome />
            </div>
        </>
    )
}