
const profileInfo = (user) => {
    try {
      const fullname = document.getElementById("fullnameUser");
      const email = document.getElementById("emailUser");
      fullname.innerHTML = user.fullname;
      email.innerHTML = user.email;
  
      const image = document.getElementById("profileImg");
      image.src = user.picture ? "/" + user.picture : "../images/avtar.avif";
      
      // fetchFile();
    } catch (err) {
      console.log(err);
    }
  
    // console.log(user)
  };
  
  
  
  const uploadProfile = async (e) => {
    const session =await getSession()
    try {
      const input = e.target;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("picture", file);
  
      const option = {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      };
  
      try {
        const res = await axios.post(
          "/api/upload-profile-picture",
          formData,
          option
        );
        console.log(res.data);
        await localStorage.setItem("auth", res.data.token);
        window.location = location.href;
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };