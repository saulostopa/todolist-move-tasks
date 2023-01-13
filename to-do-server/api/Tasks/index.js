const { ObjectId } = require("mongodb");

const addATask = (app, Users) => {
    app.put("/user/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const newTask = req.body;
            console.log(newTask)

            // first find the user you want to add a taks to
            const query = { _id: ObjectId(id) }
            const findUser = await Users.findOne(query);
            console.log(findUser)

            // finding all the tasks of that user and adding a new task
            let tasks = findUser.tasks;
            if(!findUser.tasks){
                tasks = [];
            }
            tasks.push(newTask.task);

            // updating the data in database
            const update = {
                $set: { tasks: tasks }
            }
            const updatedData = await Users.updateOne(query, update, { upsert: true })
            
            res.send({
                success: true,
                message: "Task Added"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const moveTask = (app, Users) => {
    try {
        app.put("/move/:direction/:id", async (req, res) => {
            const direction = req.params.direction;
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const data = req.body;
            const { i, position, task } = data; // destructuring data

            //find the user and remove the task from previous div
            const findUser = await Users.findOne(query);
            let tasks = findUser.tasks;
            tasks.splice(i, 1); // replace 1 element of tasks array at i (index)

            // update previous div first
            const update = {
                $set: { tasks: tasks }
            }
            const updatedData = await Users.updateOne(query, update, { upsert: true });

            // send it to next div and update the div
            let filter = {};
            if(direction === 'right'){
                filter = { position: position + 1 };
            }else{
                filter = { position: position - 1 };
            }
            const findNewDiv = await Users.findOne(filter);

            let newDivTasks = findNewDiv.tasks;
            if(!findNewDiv.tasks){
                newDivTasks = [];
            }

            // replace element and add new item at index
            if(i>= 0 && i <= newDivTasks.length){
                newDivTasks.splice(i, 0, task);
            }else{
                newDivTasks.push(task); 
            }
            
            // update new div
            const updateNew = {
                $set: { tasks: newDivTasks }
            }
            const updatedNewDiv = await Users.updateOne(filter, updateNew, { upsert: true });
            
            res.send({
                success:true,
                message:`Moved to the ${direction}`
            });
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

module.exports = { addATask, moveTask };