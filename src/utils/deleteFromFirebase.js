import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export default async function deleteFromFirebase(userId) {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `files/${userId}`);
    
    // Delete the file
    deleteObject(desertRef).then(() => {
        console.log("DATA DELETED FROM FIREBASE")
    }).catch((error) => {
      console.log("ERROR IN DELETE FROM FIREBASE...", error);
    });
}
