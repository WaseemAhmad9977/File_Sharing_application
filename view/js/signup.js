const signup = async (e) => {
  e.preventDefault();
  try {
    const form = e.target;
    const data = {
        fullname:form.elements[0].value,
        email:form.elements[1].value,
        password:form.elements[2].value
    }
    // console.log(data)
    const response = await axios.post("/api/signup",data);
    new swal({
        icon:'success',
        title:response.data.message,
        text:'Click Ok to go login page'
    }).then(()=>{
        window.location='/login.html'
    })
  } catch (err) {
    console.log(err.response.data);
  }
};
