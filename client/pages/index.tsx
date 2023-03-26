import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import io from 'socket.io-client';

export default function Home() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [myid, setMyid] = useState("")
  const [message,setMessage] = useState("")
  const [msgs, setMsgs] = useState([
    {user:"Wahid",msg:"Hi!"}
  ])
  const socket = io('http://localhost:3002')
  
  socket.on("receivemsg",(newmsgs)=>{
   
    setMsgs([...msgs,newmsgs])   
  })
  
  const sendMsg = (e:any)=>{
    e.preventDefault();
    const newMsg = {user: name, msg: message}
    socket.emit('newmsg',newMsg)
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br/>
      Enter your name: <input type="text" onChange={(e)=>setName(e.target.value)} /><br/><br/>
      <div className="msgbox">
        <p className="msg">Send something to get started!</p>
        {msgs.map(function(chat:any){  
            return <div><b>{chat.user}</b>: {chat.msg}</div>
            
        })}
      </div>      
          <form action="/msgs" method="post" onSubmit={sendMsg}>
                <input type="text" value={message} onChange={ (e)=>{setMessage(e.target.value)} } /> <br/>
                <button type="submit">Send</button> 
                <button onClick={()=>{setMsgs([])}}>Clear msgs</button>
          </form>
     </div>
  )
}