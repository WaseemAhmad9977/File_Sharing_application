const login = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const data = {
          email:form.elements[0].value,
          password:form.elements[1].value
      }
      // console.log(data)
      const response = await axios.post("/api/login",data);
      console.log(response.data)
      localStorage.setItem('auth',response.data.token)
      
      window.location = '/apps/dashboard.html'

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
    });
    }
};
  