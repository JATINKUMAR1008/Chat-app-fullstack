import { BiLoaderAlt } from "react-icons/bi";
export default function Loader(){
    return(
        <div className="w-full h-fit flex items-center justify-center">
            <BiLoaderAlt size={30} className="animate-spin"/>
        </div>
    )
}