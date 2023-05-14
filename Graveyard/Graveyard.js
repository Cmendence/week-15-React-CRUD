//All my failed attempts at getting the various methods to work.

//not needed in project
   // const handleInput = (e) => {
   //   setNewLogin({
   //    ...newLogin,
   //    [e.target.name]: e.target.value,
   //   });

   // };


   //I don't know why the below method isn't refetching the logins.

 //delete from the api (async await)
//  const deleteLogin = async (id) => {
//    console.log(id);
//    try {
//      const response = await fetch(`${API_ENDPOINT}/${id}`, { 
//        method: "DELETE", 
//        headers: { 
//          "Content-Type": "application/json",
//        },
//      });
//      console.log("response from deleteData:", response);
 
//      //if the response is ok, return the data extracted from the response
//      const data = await response.json(); //extracting json from response object
//      console.log("Data successfully deleted:", data);
//      return data;
//    } catch (error) {
//      console.error("Error deleting data from API:", error);
//    }
//    getLogins();
//  };
 

// const handleEdit = (e) => {
//    e.preventDefault();
 
//    const updatedLogin = {
//      name: editSiteName,
//      username: editUsername,
//      password: editPassword,
//    };
 
//    updateLogin(editingLogin.id, updatedLogin);
 
//    setEditingLogin(null);
//    getLogins();
//  };



   // const updateLogin = (login) => {
   //    setEditingLogin(login);
   //    setEditSiteName(login.name);
   //    setEditUsername(login.username);
   //    setEditPassword(login.password);
   //  };