import './UsersList.css';
import { useState } from 'react';


const UsersList = () => {

    const [formData, setFormData] = useState({
        username: " ",
        email: " ",
        usertype: "Admin"
    });

    const [users, setUsers] = useState([]);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData((prevDataForm) => {
            return { ...prevDataForm, [name]: target.value };
        })

    }

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }))
    }

    const removeUser = (id) => {
        const filteredUsers = users.filter(user=>user.id !== id);
        setUsers(filteredUsers);
    }

    return (
        <div className="usersList">
            <form onSubmit={setUser}>
                <label htmlFor="username">User name</label>
                <input type="text" name="username" placeholder="User name" id="username" onChange={handleInputChange} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="User email" id="email" value={formData.email} onChange={handleInputChange} />
                <label htmlFor="usertype">Choose User Type</label>
                <select name="usertype" id="usertype" onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button>Save</button>
            </form>
            <div className="list">
                {users.map(user => {
                    return (<div className='userItem' key={user.id} onClick={()=>{removeUser(user.id)}}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.usertype}</p>
                    </div>)
                })}

            </div>
        </div>

    );
}

export default UsersList;