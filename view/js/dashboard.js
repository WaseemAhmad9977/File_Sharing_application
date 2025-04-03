 window.onload= async ()=>{
    const session = await getSession()
    // console.log(token,user)
    // console.log(user)

    if(!session)
      return location.href = '/login.html'

    profileInfo(session.user)
    
 }




