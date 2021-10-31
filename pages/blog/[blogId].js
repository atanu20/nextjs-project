import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import { db ,auth, serverTimestamp} from '../../firebase'
import { useRouter } from 'next/router'
import Avatar from 'react-avatar'
const blogpage = ({blog,allmsg}) => {
    const [msg, setMsg] = useState("")
    const router=useRouter()
    const [userName, setUserName] = useState("")
    const [allMsg, setAllMsg] = useState(allmsg)
    const {blogId}=router.query
    const [dis, setDis] = useState(false)
    // console.log(allmsg)
    const makeCom=async(e)=>{
        e.preventDefault()
        await db.collection('blogs').doc(blogId).collection('comments').add(
            {
                comment:msg,
                username:userName,
                date:serverTimestamp()
               
            }
        )
        const comm=await db.collection('blogs').doc(blogId).collection('comments').orderBy('date', 'desc').get()

        // setAllMsg(comm.docs.map(docsnap=>docsnap.data()))
        const allcom = comm.docs.map(snap => {
            return {
              ...snap.data(),
              date: snap.data().date.toMillis(),
             
            }
          })
setAllMsg(allcom)

alert("Thank You For Your Comment")
setMsg("")
    }

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
          if(user){
            //   console.log(user.displayName)
              setUserName(user.displayName)
              setDis(true)
          }
          else {
            setDis(false)
          }
        })
   },[])
    return (
        <>
          <Layout>
              <div className="blog">
                  <div className="container">
                      <div className="row pt-5">
                          <div className="col-md-10 col-12 mx-auto">
                              {
                                  blog.title && <h3>{blog.title}</h3>
                              }
                              {
                                  blog.createdAt && <small>{new Date(blog.createdAt).toDateString()} </small>
                              }
                              <hr />
                             {
                                 blog.imageUrl &&  <img
                                 src={blog.imageUrl}
                                 alt={blog.title}
                                
                                 className="bigimg"
                                
                                           />
                             }
                    <br />
                    <p>{blog.desc} </p>
                          </div>
                      </div>
                      <br /><br />
                     {
                         dis ?  <div className="row ">
                         <div className="col-md-10 col-12 mx-auto">
                             <form onSubmit={makeCom}>
                             <div className="form-group">
                                              
                             <textarea className="form-control" rows="2" placeholder="Write Message" value={msg} onChange={(e)=>setMsg(e.target.value)} required> </textarea>
                                           </div>
                                           <button className="btn btn-success">Message Now</button>
                             </form>
                         </div>
                         </div> : <h5 className="text-center">For Comment  Login Please</h5>
                     }
                     <div className="row pt-3">
                        {
                            allMsg?.map((val,ind)=>{
                                return(
                                    <>
                                    <div className="col-md-10 col-12 mx-auto" key={ind}>
                                    <div className="avbox">
                                        <Avatar name={val.username} size="35" round />
                                        <small className="pl-1">{val.username}</small>
                                    </div>
                                     <p style={{marginBottom:'-8px'}}>{val.comment}</p>
                                     <small >{new Date(val.date).toDateString()}</small>
                                     <hr />
                                 </div>
                                 
                                 </>

                                )
                            })
                        }
                     </div>


                  </div>
              </div>
         
          </Layout>
         

        </>
    )
}

export default blogpage

export async function getServerSideProps(context){
    const id=context.params.blogId
    const result =  await db.collection('blogs').doc(id).get()
    const message=await db.collection('blogs').doc(id).collection('comments').orderBy('date', 'desc').get()
    // const allmsg=message.docs?.map((comsnap)=>comsnap.data())
 const allmsg = message.docs.map(snap => {
        return {
          ...snap.data(),
          date: snap.data().date.toMillis(),
         
        }
      })

    return{
        props:{
            blog:{
                ...result.data(),
                createdAt:result.data().createdAt.toMillis()
            },
            allmsg

        }
    }
}
