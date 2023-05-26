// import React, { useState } from 'react'
// import { uploadPhoto } from '../../lib/apiClient'

// const UploadPhoto = () => {
//   const [photo, setPhoto] = useState<File | null>(null)

//   const uploadFileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log(photo)
//     if (photo) {
//       await uploadPhoto(photo)
//     }
//   }

//   const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0]
//       setPhoto(file)
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={uploadFileHandler}>
//         <input type="file" onChange={fileChangeHandler}></input>
//         <button>Submit photo</button>
//       </form>
//     </div>
//   )
// }

// export default UploadPhoto
