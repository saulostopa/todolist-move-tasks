import React from 'react';
import { Box, Title, Item, Arrow, Task, DivButton, Button } from "./styles"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Card = ({ user, handleAddTask, setRefech }) => {
    // destructuring the users data
    const { name, bg, tasks, position, _id } = user;

    // move task to right
    const handleClick = (task, i, direction) => {
        const data = {
            i: i,
            position,
            task
        }
        fetch(`http://localhost:8000/move/${direction}/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setRefech(true)
                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <Box>
                <Title bg={bg}>{name}</Title>
                {
                    tasks?.map((t, i) => <Item key={i}>
                        <Arrow disabled={position === 1} onClick={() => handleClick(t, i, 'left')}><FaAngleLeft /></Arrow>
                        <Task>{t}</Task>
                        <Arrow disabled={position === 4} onClick={() => handleClick(t, i, 'right')}><FaAngleRight /></Arrow>
                    </Item>)
                }
                <DivButton>
                    <Button onClick={() => handleAddTask(user)}>+ Add a Task</Button>
                </DivButton>
            </Box>
        </div>
    );
};

export default Card;