import './UsersList.css';
import { useEffect, useState } from 'react';


const UsersList = () => {

    const [formData, setFormData] = useState({
        username: " ",
        email: " ",
        usertype: "Admin"
    });

    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [filterSelected, setFilterSelected] = useState("All");

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData((prevDataForm) => {
            return { ...prevDataForm, [name]: target.value };
        })

    }

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }));
    }

    const removeUser = (id) => {
        const filteredUsers = users.filter(user=>user.id !== id);
        setUsers(filteredUsers);
    }

    
    const filterBy = (filterValue) => {

        if(filterValue === "Admin"){
           const filteredArray = users.filter(user=>user.usertype === "Admin");
           setDisplayedUsers(filteredArray);
           
        }
        else if(filterValue === "User"){
            const filteredArray = users.filter(user=>user.usertype === "User");
           setDisplayedUsers(filteredArray);
        }
        else if(filterValue === "All"){
            setDisplayedUsers(users);
        }
    }

    useEffect(()=>{
        setDisplayedUsers(users);
        filterBy(filterSelected);
    }, [users, filterSelected])

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
                <div className='filterButtons'>
                    <span>Filter By: </span>
                    <button onClick={()=>setFilterSelected("Admin")}>Admins only</button>
                    <button onClick={()=>setFilterSelected("User")}>Users only</button>
                    <button onClick={()=>setFilterSelected("All")}>All</button>
                </div>
                {displayedUsers.map(user => {
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