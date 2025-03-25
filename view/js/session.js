window.onload = async ()=>{
    let user = null;
    const session = await localStorage.getItem('auth')

    
    if((location.pathname ==='/login.html' || location.pathname==='/signup.html') && !session )
        return 

    if(!session)
        return window.location = '/login.html'

    try{
        const response = await axios.post('/api/verify-token',{token:session})
        profileInfo(response.data.user)
        console.log(response.data.user)

        if(location.pathname ==='/login.html' || location.pathname==='/signup.html')
            return window.location ='apps/dashboard.html'
    }
    catch(err)
    {
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
}

const uploadProfile=(e)=>{
    const input = e.target
    console.log(input.files[0])
}