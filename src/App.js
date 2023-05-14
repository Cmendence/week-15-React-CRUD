import './App.css';
import {useState, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const API_ENDPOINT = 'https://645a7b3995624ceb21034bcc.mockapi.io/passwords'

function App() {

   //state variable for data from mockAPI
   const [logins, setLogins] = useState([{}]);

   //new data state variables
   const[newSiteName, setNewSiteName] = useState('');
   const[newUsername, setNewUsername] = useState('');
   const[newPassword, setnewPassword] = useState('');

   //edit data state variables
   const [editSiteName, setEditSiteName] = useState('');
   const [editUsername, setEditUsername] = useState('');
   const [editPassword, setEditPassword] = useState('');

// fetch login info from mockAPI
 const getLogins = async () => {
   try { 
     const resp = await fetch(API_ENDPOINT); // response from the api
     const data = await resp.json(); //extracting json from response object
     setLogins(data)
     return data; //return the data
   } catch (error) { 
     console.error("Something went wrong", error);
   }
 };

 //useEffect using fetchLogins
 useEffect(() => {
   getLogins()
}, [] )
 
//posting new data to API
const postNewLogin = async (e) => {
   const data = {
      name: newSiteName,
      username: newUsername,
      password: newPassword
   }
   try {
      const resp = await fetch(API_ENDPOINT, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data),
      })
      console.log(resp)
      let respdata = await resp.json()
      console.log(respdata);
   } catch (error){
      console.log(error);
   }
   getLogins();
   setNewSiteName('');
   setNewUsername('');
   setnewPassword('');
}

//submit button from form
   const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: newSiteName,
    username: newUsername,
    password: newPassword,
  };
  try {
    await postNewLogin(data);
  } catch (error) {
    console.log(error);
  }
  getLogins();
};

   const deleteLogin = (id) => {
      fetch(`${API_ENDPOINT}/${id}`, {
         method: 'DELETE'
      }).then(()=> getLogins());
   }
 
   const handleEdit = (id) => async (e) => {
      e.preventDefault();
    
      const updatedLogin = {
        name: editSiteName,
        username: editUsername,
        password: editPassword,
      };
    
      await updateLogin(id, updatedLogin);
    
      getLogins();
    };
    
    const updateLogin = async (id, loginObject) => {
      console.log(id);
    
      const updatedLoginObject = {
        ...loginObject,
        name: editSiteName,
        username: editUsername,
        password: editPassword,
      };
    
      await fetch(`${API_ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedLoginObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      setEditSiteName("");
      setEditUsername("");
      setEditPassword("");

      getLogins();
    };
    



 return (
   <div className='container'>
      <h1 className='text-center'>Password Manager</h1>
   <form className='form-group' onSubmit={handleSubmit}>
     <label htmlFor='site-name'>Site Name:</label>
     <input
       className='form-control'
       type='text'
       name='site-name'
       placeholder='Name Your Login'
       value={newSiteName}
       onChange={(e) => setNewSiteName(e.target.value)}
     />

     <label htmlFor='username'>Username:</label>
     <input
       className='form-control'
       type='text'
       name='username'
       placeholder='Username'
       value={newUsername}
       onChange={(e)=> setNewUsername(e.target.value)}
     />

     <label htmlFor='password'>Password:</label>
     <input
       className='form-control'
       type='text'
       name='password'
       placeholder='Password'
       value={newPassword}
       onChange={(e)=> setnewPassword(e.target.value)}
     />

     <button className='btn btn-primary mt-2' type="submit">Add Login</button>
   </form>

    
      <div className='row'>
         <div className='col-3'></div>
         <div className='col-6'>
  <form onSubmit={handleEdit} className='form-group'>
    <label htmlFor='edit-site-name'>Edit Site Name:</label>
    <input
      className='form-control'
      type='text'
      name='edit-site-name'
      value={editSiteName}
      onChange={(e) => setEditSiteName(e.target.value)}
      required
    />

    <label htmlFor='edit-username'> Edit Username:</label>
    <input
      className='form-control'
      type='text'
      name='edit-username'
      value={editUsername}
      onChange={(e) => setEditUsername(e.target.value)}
      required
    />

    <label htmlFor='edit-password'> Edit Password:</label>
    <input
      className='form-control'
      type='text'
      name='edit-password'
      value={editPassword}
      onChange={(e) => setEditPassword(e.target.value)}
      required
    />
  </form>
  </div>
  <div className='col-3'></div>
  </div>

            <table className='table table-striped table-light'>
              <thead>
               <tr>
               <th>Site</th>
               <th>Username</th>
               <th>Password</th>
               <th>Actions</th>
               </tr>
              </thead>
              <tbody>
               {logins.map((login, index) => (
               <tr key={index}>
               <td>{login.name}</td>
               <td>{login.username}</td>
               <td>{login.password}</td>
               <td>
                  <button className='btn btn-secondary me-2'onClick={()=>updateLogin(login.id, login)}>Edit</button>
                  <button className='btn btn-danger' onClick={()=> deleteLogin(login.id)}>Delete</button>
               </td>
               </tr>
            ))}
            </tbody>
            </table>

           

            </div>
         
 );
}


export default App;
