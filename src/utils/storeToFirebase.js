import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { v4 } from "uuid";
export default async function storeToFirebase(images) {
    if(images === null) return;
    let downloadUrl = [];
        console.log(images[0]);
    await Promise.all(images.map(async(image) => {
        try{
            const imageName = image.name + v4();
            const imageRef = ref(storage, `images/${imageName}`);
        
            await uploadBytes(imageRef, image)
            const url = await getDownloadURL(imageRef);
            downloadUrl.push(url);
        } catch(error) {
            console.log("ERROR in Store to Firebase...", error);
        }
    }))
    
    toast.success("IMAGE UPLOADED")
    console.log("DOWNLOAD URLS...", downloadUrl);
    return downloadUrl;
}