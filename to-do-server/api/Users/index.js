const getUsers = (app,Users) => {
    app.get("/user", async (req, res) => {
        try {
            const result = await Users.find({}).sort({position:1}).toArray();
            res.send({
                success:true,
                data:result
            })
        } catch (error) {
            res.send({
                success:false,
                message:error.message
            })
        }
    })
};

module.exports ={getUsers};