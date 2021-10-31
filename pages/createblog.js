
import Layout from '../components/Layout'
import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {storage,db,serverTimestamp,auth} from '../firebase'
import { useRouter } from 'next/router'
const blogg = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState(null)
    const [imglink, setImglink] = useState("")
    const [dis, setDis] = useState(false)
    const [userId, setUserId] = useState("")
    const router=useRouter()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
          if(user){
            //   console.log(user.displayName)
              setUserId(user.uid)

          }
          else {
            router.push('/login')
          }
        })
   },[])

   useEffect(async ()=>{
    if(imglink){
        try{
            setDis(true)
             await db.collection('blogs').add({
              title,
              desc,
              imageUrl:imglink,
              postedBy:userId,
              createdAt:serverTimestamp()
          })
          alert('Blog Uploaded')
          router.push('/')
          setDis(false)
        }catch(err){
            alert(err.message)  
        }
          

    }
},[imglink])

const onsub=(e)=>{
    e.preventDefault()
    setDis(true)
    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
    uploadTask.on('state_changed', 
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress == '100') {
          console.log("image uploaded")
      }    
      
    }, 
    (error) => {
        console.log(error.message)
        setDis(false)
    }, 
    () => {
    
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at ', downloadURL);
        setImglink(downloadURL)
        setDis(false)
        
         
      });
    }
  );
}

    return (
        <>
            <Layout>
                <br />
                <div className="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-12 mx-auto">
                                <div className="card p-3">
                                    <h4 className="text-center">Post Blog</h4>
                                    <form onSubmit={onsub}>
                                        <div className="form-group">
                                            <label htmlFor="">Title:</label>
                                            <input type="text" placeholder="Enter Title" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="">Write Desc:</label>
                                        <textarea className="form-control" rows="3" placeholder="Enter Desc" value={desc} onChange={(e)=>setDesc(e.target.value)} required>
                                            
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="">Enter Image:</label>
                                    <input type="file" className="form-control-file border"  onChange={(e)=>setImage(e.target.files[0])}  required/>
                                    </div>


                                        
                                        <div className="text-center">
                                        <button className= {dis? "btn btn-success disable" : "btn btn-success"} disabled={dis}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<br /><br />
            </Layout>


        </>
    )
}

export default blogg
