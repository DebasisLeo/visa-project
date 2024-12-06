import React from 'react';
import {useLoaderData,Link} from 'react-router-dom'
const Users = () => {
    const users=useLoaderData()
    const handleDelete=(_id)=>{
console.log(_id)

fetch(`http://localhost:8000/users/${_id}`,{
    method:'DELETE'
})
.then(res=>res.json())
.then(data=>{console.log(data)
if (data.deletedCount) {
    alert('delete succesfully')
}

})
    }
    return (
       
        <div>
            <h2>users{users.length}</h2>
            <div>
                {
                    users.map(user=> <p>{user.name}: {user.email}
                    
                    <Link to={`/update/${user._id}`} ><button>Update</button></Link>
                    
                     <button onClick={()=>handleDelete(user._id)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;