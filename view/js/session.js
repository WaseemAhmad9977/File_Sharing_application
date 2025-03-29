
let session = null;
window.onload = async ()=>{
     session = await localStorage.getItem('auth')
    
    if((location.pathname ==='/login.html' || location.pathname==='/signup.html') && !session )
        return 

    if(!session)

        return window.location = '/login.html'
    try{
        const response = await axios.post('/api/verify-token',{token:session})
        // console.log(response.data)
        
        if(location.pathname ==='/login.html' || location.pathname==='/signup.html')
                    return window.location ='apps/dashboard.html'
                
        profileInfo(response.data.user)
        // console.log(response.data.user)
    }
    catch(err)
    {
        console.log(err)

        localStorage.clear()
        window.location='/login.html'
    }
}

const logout =()=>{
   localStorage.clear()
   window.location = '/login.html'
}

const profileInfo = (user)=>{
    const fullname = document.getElementById('fullnameUser')
    const email = document.getElementById('emailUser')
    fullname.innerHTML=user.fullname
    email.innerHTML = user.email

    const image = document.getElementById('profileImg')
    image.src = user.picture ? '/'+user.picture : '../images/avtar.avif'
    console.log(user)
}

const uploadProfile=async (e)=>{
    try{
      const input = e.target
     const file = input.files[0]
     const formData = new FormData();
     formData.append('picture',file)
      
     const option ={
        headers:{
            Authorization:`Bearer ${session}`
        }
     }
     
     try{
       const res =await axios.post('/api/upload-profile-picture',formData,option)
       console.log(res.data)
       await localStorage.setItem('auth',res.data.token)
       window.location= location.href
     }
     catch(err){
        console.log(err)
     }

  }
  catch(err)
  {
    console.log(err)
  }    
}