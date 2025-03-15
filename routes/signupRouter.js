const { Router } = require("express")
const { createUser } = require("../controllers/signupController")

const signupRouter = Router()

signupRouter.post("/", createUser)

module.exports = signupRouter