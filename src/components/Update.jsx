import React from 'react';
import {useLoaderData} from 'react-router-dom'
const Update = () => {

    const loadData=useLoaderData()
    const handleUpdate=(e)=>{
        e.preventDefault()
        const form=e.target
        const name=form.name.value
        const email =form.email.value
        const user={name,email}
        console.log(user)
        fetch(`http://localhost:8000/users/${loadData?._id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            }
            ,
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
    .then(data=>{console.log(data)})
    }
    return (
        <div>
            <h2>updated informatioon {loadData.name}</h2>

            <form onSubmit={handleUpdate}>
           <input type="text" name="name" defaultValue={loadData?.name} id="" />
           <br />
           <input type="email" name="email" defaultValue={loadData?.email} id="" />
           <br />
           <input type="submit" value="Submit" />


            </form>
        </div>
    );
};

export default Update;