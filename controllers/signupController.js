const prisma = require('../prsima')
const bcrypt = require("bcryptjs")

exports.createUser = async(req, res, next) => {
    const { username, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    })

    console.log("created user")
    
    res.json({
        data: {
            message: "Successfully created an Account"
        }
    })
}