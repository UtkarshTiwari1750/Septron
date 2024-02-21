import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
export default async function storeToFirebase(images, userId) {
    if(images === null || images.length === 0) return;
    let downloadUrl = [];
    
    await Promise.all(images.map(async(image) => {
        try{
            const imageName = image.name + v4();
            const imageRef = ref(storage, `files/${userId}/${imageName}`);
        
            await uploadBytes(imageRef, image)
            const url = await getDownloadURL(imageRef);
            downloadUrl.push(url);
        } catch(error) {
            console.log("ERROR in Store to Firebase...", error);
        }
    }))
    
    return downloadUrl;
}