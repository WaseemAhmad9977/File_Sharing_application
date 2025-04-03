let session = null;
window.onload = async () => {
  session = await getSession();
  // console.log(session)
  if (!session) return (window.location = "/login.html");

  profileInfo(session.user);
  fetchFile(session.token);
};

const fetchFile = async (session) => {
  try {
    const option = {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    };
    const res = await axios.get("/api/file", option);
    // console.log(res)

    const table = document.getElementById("table");

    let count = 1;

    for (let file of res.data.user) {
      // console.log(file.filename)
     
      const ui = `
                <tr class="border-b hover:bg-gray-50 transition duration-200">
                <td class="py-4 pl-4">${count}</td>
                <td>${file.filename}</td>
                <td>${file.size}</td>
                <td>${file.type}</td>
                <td>${moment(file.createdAt).format(
                  "DD MMM YYYY  hh:mm:ss A"
                )}</td>
            <td>
              <div class="space-x-2 pr-4 flex flex-wrap gap-2">
                <button onclick = "deleteFile('${file._id}')"
                  class="bg-rose-500 w-10 h-10 rounded-lg text-white hover:bg-rose-600 transition duration-300 transform hover:scale-105"
                >
                  <i class="ri-delete-bin-6-line"></i>
                </button>
                <button
                  class="bg-green-500 w-10 h-10 rounded-lg text-white hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  <i class="ri-share-line"></i>
                </button>
                <button onclick="fileDownload('${file.path}', '${file.filename}')"
                  class="bg-green-500 w-10 h-10 rounded-lg text-white hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  <i class="ri-download-line"></i>
                </button>
              </div>
            </td>
          </tr>
           `;

      table.innerHTML += ui;
      count++;
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

const deleteFile = async (id) => {
  try {
    const option = {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    };
    const res = await axios.delete(`/api/file/${id}`, option);
    // console.log(res.data)
    window.location = location.href;
  } catch (err) {
    console.log(err.response.data);
  }
};

const uploadFile = async (e) => {
  const input = e.target;
  const file = input.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const option = {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  };

  try {
    await axios.post("/api/file", formData, option);
    // console.log(res)
    window.location = location.href;
  } catch (err) {
    console.log(err.response.data);
  }
};

const fileDownload = async (path,filename) => {

  try {
  
    const option = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${session.token}` 
      }
    };
    
    const { data } = await axios.post("/api/file/download", { path }, option);
    const url = URL.createObjectURL(data);
    // console.log(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    a.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
     const error = await (err.response.data).text()
     console.log(error)
  }
};

