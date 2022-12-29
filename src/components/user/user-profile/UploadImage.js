import { useState } from "react";
import UploadServices from "../../services/UploadServices";
import '../../../Styles/user/uploadImage.css'
export const UploadImage = ({ setImages, images }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [pathImage, setPathImage] = useState("https://talently.tech/blog/wp-content/uploads/2022/02/%C2%BFQue-es-un-framework-en-programacion-scaled-1200x675.jpg");
    const sendImage = (e) => {
        e.preventDefault();
        UploadServices.sendImage(name, file)
            .then((result) => {
                console.log("El resultado es: ", result)

            }
            ).catch(err => console.log(err));

    }
    // Esta funcion nos permitira mostrar una preview de la imagen que estamos subiendo
    const onfileChange = e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.includes("image")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(file)
            } else {
                console.log("There was an error")
            }
        }
    }
    return (
        <>
            <div className="">
                <form className="">
                    <div className="input-file">
                        <input type="file"  onChange={onfileChange}/>
                        <img className="image-fluid img-thumbnail image" src={pathImage} alt="image"/>
                        <input type="text" placeholder ="enter a name" className="name-picture mt-2" onChange={(e=> setName(e.target.value))}/>
                        <button className="btn btn-outline-primary btn-lg btn-block" type="submit" onClick={sendImage}>Guardar imagen</button>
                    </div>
                </form>
            </div>
        </>
    );
}