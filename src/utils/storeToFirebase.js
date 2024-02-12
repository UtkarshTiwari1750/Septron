import { storage } from "../firebase";
import { ref, uploadBytes, list, listAll, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { v4 } from "uuid";
export default async function storeToFirebase(image) {
    if(image === null) return;
    const imageName = image.name + v4();
    const imageRef = ref(storage, `images/${imageName}`);
    await uploadBytes(imageRef, image)
    toast.success("IMAGE UPLOADED")

    let downloadUrl;

    await getDownloadURL(imageRef).then((url) => downloadUrl = url)
    return downloadUrl;
}