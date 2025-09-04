
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
 const API="http://localhost:4000";

function App() {

  const[form,setForm]=useState({name:"",age:"",email:"",dept:"",phone:"",address:"",year:""});
  const[people,setPeople]=useState([]);
  // form edit
  const[editId,setEditId]=useState(null);
   const[editForm,setEditForm]=useState({name:"",age:"",email:"",dept:"",phone:"",address:"",year:""});
  
// Read User
async  function load(){
  const res= await axios.get(`${API}/`); //request
  setPeople(res.data); //response

}
useEffect(()=>{load();},[])

// create USer
async function addPerson(e) {
  e.preventDefault();
  if(!form.name || !form.age||!form.email||!form.dept||!form.phone||!form.address||!form.year) return alert("Enter All fields");
   const res=await axios.post(`${API}/`,{
    name:form.name,
    age:Number(form.age),
    email:form.email,
    dept:form.dept,
    phone:Number(form.phone),
    address:form.address,
    year:Number(form.year)
   });
   setPeople([...people,res.data]);
   setForm({name:"",age:"",email:"",dept:"",phone:"",address:"",year:""});
}

// Edit USer
 function startEdit(p){
  setEditId(p._id);
  setEditForm({name:p.name,age:Number(p.age),email:p.email,dept:p.dept,phone:p.phone,address:p.address,year:Number(p.year)});

 }
function cancelEdit(){
  setEditId(null);
}
// Save Edit Update
async function saveEdit(id) {
  if(!editForm.name || !editForm.age||!editForm.email||!editForm.dept||!editForm.phone||!editForm.address||!editForm.year) return alert("Enter All Fields");

  const res= await axios.put(`${API}/${id}`,{
    name:editForm.name,
    age:Number(editForm.age),
    email:editForm.email,
    dept:editForm.dept,
    phone:Number(editForm.phone),
    address:editForm.address,
    year:Number(editForm.year)


  }

  );
  setPeople(people.map(p=>(p._id===id?res.data:p))
  );
  setEditId(null);
};
// Delete USer
async function remove(id) {
  await axios.delete(`${API}/${id}`);
  setPeople(people.filter(p=>p._id!==id));

};
  

  
 
  return (
    <div className="container mt-5">
      {/* Row for Add Users */}
      <div className='row justify-content-center'>
        <div className='col-md-6'>
        <h2 className='text-center mb-4'>BIT Students - Add Student</h2>
        <hr/>
        <form onSubmit={addPerson}>
          <input type='text' className='form-control mb-3' placeholder='Enter  Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
          <input type='number'className='form-control mb-3' placeholder='Enter  Age' value={form.age}onChange={(e)=>setForm({...form,age:e.target.value})} required/>
          <input type='email'className='form-control mb-3' placeholder='Enter  email' value={form.email}onChange={(e)=>setForm({...form,email:e.target.value})} required/>
          <input type='text'className='form-control mb-3' placeholder='Enter  dept' value={form.dept}onChange={(e)=>setForm({...form,dept:e.target.value})} required/>
          <input type='text'className='form-control mb-3' placeholder='Enter  phone' value={form.phone}onChange={(e)=>setForm({...form,phone:e.target.value})} required/>
          <input type='text'className='form-control mb-3' placeholder='Enter  address' value={form.address}onChange={(e)=>setForm({...form,address:e.target.value})} required/>
          <input type='number'className='form-control mb-3' placeholder='Enter  Year' value={form.year}onChange={(e)=>setForm({...form,year:e.target.value})} required/>

          <button className='btn btn-primary w-100'>Create</button>
        </form>
</div>
      </div>
      {/* Row for List Users */}
      <div className='row mt-5'>
        <div className='col'>
          <h3 className='mb-3'>Students List</h3>
{people.length===0 ?(<p>No Student found</p>):
(<table className='table table-bordered table-hover table-striped'>
  <thead className='table-dark'>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Email</th>
      <th>Dept</th>
      <th>Phone</th>
      <th>Address</th>
      <th>Year</th>
      <th style={{width:'200px'}}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {people.map(p=>(

      <tr key={p._id}>
      {editId === p._id?(
        <>
        <td><input className='form-control' value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})}/></td>
        <td><input className='form-control' value={editForm.age} onChange={e=>setEditForm({...editForm,age:e.target.value})}/></td>
         <td><input className='form-control' value={editForm.email} onChange={e=>setEditForm({...editForm, email: e.target.value})}/></td>
    <td><input className='form-control' value={editForm.dept} onChange={e=>setEditForm({...editForm, dept: e.target.value})}/></td>
    <td><input className='form-control' value={editForm.phone} onChange={e=>setEditForm({...editForm, phone: e.target.value})}/></td>
    <td><input className='form-control' value={editForm.address} onChange={e=>setEditForm({...editForm, address: e.target.value})}/></td>
    <td><input className='form-control' value={editForm.year} onChange={e=>setEditForm({...editForm, year: e.target.value})}/></td>
  
        <td>
          <button className='btn btn-success' onClick={()=>saveEdit(p._id)}>Save</button>
          <button className='btn btn-secondary' onClick={cancelEdit}>Cancel</button>
        </td>
        </>
      ):(
        <>
           <td>{p.name}</td>
        <td>{p.age}</td>
         <td>{p.email}</td>
          <td>{p.dept}</td>
           <td>{p.phone}</td>
            <td>{p.address}</td>
             <td>{p.year}</td>
        <td>
          <button className='btn btn-warning' onClick={()=>startEdit(p)}>Edit</button>
          <button className='btn btn-danger' onClick={()=> remove(p._id)}>Delete</button>
        </td>
        </>
      )
      
    
    }

     
      </tr>

   )
   )}
  </tbody>

</table>)}
        </div>

      </div>
    </div>
  );
};

export default App;
