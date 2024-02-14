// import moment from "moment";
// import { useState, useEffect } from "react";

// const PopUpThread=({PopUpFeedThread})=> {
//     console.log(PopUpFeedThread)
//     const [user,setUser]=useState(null)
//     const getUser=async () =>{
//         try{
//             const response= await fetch(`http://localhost:3000/users?user_uuid=${PopUpFeedThread.thrad_from}`)
//             const data =await response.json()
//             setUser(data[0])
//         }catch(error){
//             console.error(error)
//         }
//     }

//     useEffect(()=>{
//         getUser()
//     })
//     // const timePassed=moment().startOf('day').fromNow(PopUpFeedThread.timestamp)
//     const timePassed = PopUpFeedThread?.timestamp ? moment().startOf('day').fromNow(PopUpFeedThread.timestamp) : '';

//     return (
//         <article className="feed-card">
//             <div className="text-container">
//                 <div >
//                     <div  className="img-container">
//                         <img src={user?.img} alt="profile-avatar"/>
//                     </div>
//                     <div>
//                     <p><strong>{user.handle}</strong></p>
//                     <p>{PopUpFeedThread.text}</p>
//                     </div>
//                 </div>
//                 <p className="sub-text">{timePassed}</p>
     
//             </div>
      
//         </article>
//     );
//   }
  
//   export default PopUpThread;

import moment from "moment";
import { useState, useEffect } from "react";

const PopUpThread = ({ PopUpFeedThread }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?user_uuid=${PopUpFeedThread?.thread_from}`);
            const data = await response.json();
            setUser(data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const userHandle = user?.handle || '';
    const timePassed = PopUpFeedThread?.timestamp ? moment().startOf('day').fromNow(PopUpFeedThread.timestamp) : '';

    // Check if PopUpFeedThread and its text property exist before accessing it
    const threadText = PopUpFeedThread?.text || '';

    return (
        <article className="feed-card">
            <div className="text-container">
                <div>
                    <div className="img-container">
                        <img src={user?.img} alt="profile-avatar" />
                    </div>
                    <div>
                        {userHandle && <p><strong>{userHandle}</strong></p>}
                        {/* Render thread text only if it exists */}
                        {threadText && <p>{threadText}</p>}
                    </div>
                </div>
                {timePassed && <p className="sub-text">{timePassed}</p>}
            </div>
        </article>
    );
};

export default PopUpThread;

  