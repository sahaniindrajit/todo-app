import Router from 'express'
import bycrpt from 'bcrypt'
import user from './db/user.js'
import jwt from 'jsonwebtoken'
import auth from './auth.js';
import task from './db/task.js';


const router = Router();
router.post('/', (req, res) => {

})

router.post("/signup", async (req, res) => {
    const name = req.headers.name;
    const username = req.headers.username;
    const password = req.headers.password;
    const hash = await bycrpt.hash(password, 10);


    if (!username && !password && !name) {
        return res.status(403).json({
            msg: "Invalid inputs"
        })

    }

    try {
        await user.create({
            name: name,
            username: username,
            password: hash
        })

        res.status(200).json({
            msg: "User created successfully"
        })
    }
    catch (err) {
        console.log(err)
        res.status(403).json({
            msg: "username already exist"
        })
    }
})

router.get("/signin", async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    if (!username || !password) {
        return res.status(403).json({
            msg: "Invalid inputs"
        })
    }

    try {
        const oldUser = await user.findOne({
            username
        })
        if (!oldUser) {
            res.status(403).json({
                msg: "user dosen't exist"
            })
        }
        else {
            const passwordVerify = await bycrpt.compare(password, oldUser.password);
            if (!passwordVerify) {
                res.json({
                    msg: "Incorrect password"
                })
            }
            else {
                const payload = {
                    id: oldUser._id,
                    username: oldUser.username
                }
                const token = jwt.sign(payload, process.env.JWT_PASSWORD)
                return res.cookie('access_token', token, {
                    httpOnly: true
                }).status(200).json({
                    msg: "Signin success"
                })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(403).json({
            msg: "Server error"
        })
    }
})

router.get("/logout", async (req, res) => {
    res.clearCookie('access_token')
    return res.status(200).json({
        msg: "Logout sucesss"
    })
})

router.get("/me", auth, async (req, res) => {
    try {
        const data = await user.findById(req.user.id).select('name username')
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: "Server error"
        });
    }
})

router.post("/todo", auth, async (req, res) => {
    const { title, description } = req.body;
    const ID = req.user.id
    if (!title || !description) {
        res.status(400).json({
            msg: "Fill title & description"
        })
    }
    try {
        await task.create({
            title,
            description,
            user: ID
        })
        res.status(200).json({
            msg: "Task create sucessfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: "Server error"
        });
    }

})

router.get("/todo", auth, async (req, res) => {
    try {
        const ID = req.user.id;
        const allTask = await task.find({ user: ID });
        res.status(200).json({
            Tasks: allTask
        })

    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Server error"
        })
    }
})

router.put("/todo/update/:taskid", auth, async (req, res, next) => {
    try {
        const taskID = await task.findById(req.params.taskid);
        if (!taskID) {
            return res.status(404).json({
                msg: "wrong task ID"
            })
        }
        if (taskID.user.toString() !== req.user.id) {
            res.status(404).json({
                msg: "Not autherized"
            })
            return next()
        }

        const updateTask = await task.findByIdAndUpdate(req.params.taskid, {
            title: req.body.title,
            description: req.body.description
        }, { new: true })

        res.status(200).json(updateTask)

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            msg: "Server error"
        })
    }
})

router.delete("/todo/delete/:taskid", auth, async (req, res, next) => {
    try {
        const taskID = await task.findById(req.params.taskid);
        if (!taskID) {
            return res.status(404).json({
                msg: "wrong task ID"
            })
        }
        if (taskID.user.toString() !== req.user.id) {
            res.status(404).json({
                msg: "Not autherized"
            })
            return next()
        }

        await task.findByIdAndDelete(req.params.taskid)


        res.status(200).json({
            msg: "Task deleted sucessfully"
        })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            msg: "Server error"
        })
    }
})

export default router; 