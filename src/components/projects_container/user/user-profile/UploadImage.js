import { useState } from "react";
import UploadServices from "../../../services/UploadServices";
import '../../../../Styles/user/uploadImage.css'
export const UploadImage = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [pathImage, setPathImage] = useState("");
    const [status, setStatus] = useState();
    const sendImage = (e) => {
        e.preventDefault();
        if (((file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) && (file.size <= 100000)) {
            UploadServices.sendImage(name, file)
                .then((req) => {
                    // console.log(req.data)
                    req.data.code === 404 ? setStatus(false) : setStatus(true);
                }
                ).catch(err => console.log(err));
        }else setStatus(false)


    }
    // Esta funcion nos permitira mostrar una preview de la imagen que estamos subiendo
    const onfileChange = e => {
        // Validamos que efectivamente se mande algo en el input de file
        if (e.target.files && e.target.files.length > 0) {
            //Desestructuramos el arreglo para solo devolver el objeto con la informacion de la imagen
            const [file] = e.target.files;
            const reader = new FileReader();

            if ((file.type.includes("image") && (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) && (file.size <= 100000)) {
                reader.readAsDataURL(file);
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(file) //Aqui guardamos la imagen para despues enviarla
                setStatus('');
                document.querySelector('.btn-submit').disabled = false; //Habilitamos el boton
               
            } else {
                //Borramos el documento por no cumplir el formato que estamos solicitando
                document.querySelector('input[name=file]').value = "";
                setFile('') //Borramos la imagen
                setPathImage('') //Quitamos la imagen en caso que exista 
                setStatus(false);
                document.querySelector('.btn-submit').disabled = true; //Desabilitamos el boton
                

            }
        }
    }
    return (
        <>
            <div className="">
                <form className="" onSubmit={sendImage}>
                    <div className="input-file">
                        <input type="file" onChange={onfileChange} accept="image/jpeg, image/png, image/jpg" name="file" required />
                        {pathImage ?
                            <div>
                                <img className="image-fluid img-thumbnail image" src={pathImage} alt="image" />
                                <input type="text" placeholder="enter a name" className="name-picture mt-2" onChange={(e => setName(e.target.value))} />
                            </div>
                            : ''}
                        {status ? <div className="alert alert-success text-center">Imagen actualizada correctamente..</div> : ''}
                        {status === false ? <div className="text-center alert alert-danger">Selecciona una imagen valida...</div> : ''}
                        <input type="submit" className="btn btn-primary btn-submit" value="Guardar imagen"   disabled/>
                    </div>
                </form>
            </div>
        </>
    );
}