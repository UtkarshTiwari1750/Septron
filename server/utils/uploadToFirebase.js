const {getStorage, ref, uploadBytesResumable} = require("firebase/storage")
const {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth");
const auth = require("../config/firebase.config");
const fs = require("fs")
exports.uploadToFirebase = async(file, quantity) => {
    const storageFB = getStorage();
    // await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
    // .then((res) => {
    //     console.log('res', res)
    // })
    // .catch((err) => {
    //   console.log('err', err)
    // })

    if(quantity === 'single'){
        const fileName = `images/${file.name}`;
        const storageRef = ref(storageFB, fileName);
        const metadata = {
            contentType: file.type,
        }
        console.log("OK HERE........", file);

        const uploadDetails = await uploadBytesResumable(storageRef, file);

        return uploadDetails;
    }
    else{
        for(let i=0; i < file.images.length; i++){
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`;
            const storageRef = ref(storageFB, fileName);
            const metadata = {
                contentType: file.images[i].mimetype,   
            }

            const uploadDetails = await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
        }
        return uploadDetails;
    }
}




