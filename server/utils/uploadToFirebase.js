// const {getStorage, ref, uploadBytesResumable} = require("firebase/storage")
// const {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth");
// const auth = require("../config/firebase.config");
// const fs = require("fs")
// exports.uploadToFirebase = async(file, quantity) => {
//     const storageFB = getStorage();
//     // await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
//     // .then((res) => {
//     //     console.log('res', res)
//     // })
//     // .catch((err) => {
//     //   console.log('err', err)
//     // })

//     if(quantity === 'single'){
//         const fileName = `images/${file.name}`;
//         const storageRef = ref(storageFB, fileName);
//         const metadata = {
//             contentType: file.type,
//         }
//         console.log("OK HERE........", file);

//         const uploadDetails = await uploadBytesResumable(storageRef, file);

//         return uploadDetails;
//     }
//     else{
//         for(let i=0; i < file.images.length; i++){
//             const dateTime = Date.now();
//             const fileName = `images/${dateTime}`;
//             const storageRef = ref(storageFB, fileName);
//             const metadata = {
//                 contentType: file.images[i].mimetype,   
//             }

//             const uploadDetails = await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
//         }
//         return uploadDetails;
//     }
// }





const {storage} = require("../config/firebase.config");
const {ref, uploadBytes} = require("firebase/storage")

exports.uploadToFirebase = async(file) => {
    const imageRef = ref(storage, `images/${file.name}`);
    const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    const files = new File([],"hello");
    console.log("FILES", files);
    // const uploadDetails = await uploadBytes(imageRef, bytes);
    // console.log('UPLOAD DETAILS...', uploadDetails);
}

