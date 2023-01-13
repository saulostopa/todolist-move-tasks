import React, { useEffect, useState } from 'react';
import { Container, LoadingIndicator } from './styles';
import Card from '../Card';

const ToDo = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refech, setRefech] = useState(false);
    
    // call API to build cards
    useEffect(() => {
        fetch('http://localhost:8000/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data.data)
                setLoading(false)
                setRefech(false)
            })
    }, [refech])

    // taking input from the prompt and send it to db
    const handleAddTask = (user) => {
        const newTask = prompt("What to do next?")
        if(newTask === null){
            return;
        }else{
            // posting a new task
            const data = { task: newTask }
            fetch(`http://localhost:8000/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => setRefech(true))
                .catch(err => console.log(err))
        }
    }

    if(isLoading){
        return <LoadingIndicator />
    }

    return (
        <Container>
            {
                users?.map(user => <Card
                    key={user._id}
                    user={user}
                    handleAddTask={handleAddTask}
                    setRefech={setRefech}
                />)
            }
        </Container>
    );
};

export default ToDo;