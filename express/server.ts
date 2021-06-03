import {Request, Response} from "express";

const express = require("express")

const app = express()

app.get('/hello', (req: Request, res: Response) => {
    res.send("Hello World")
})

console.log('Open http://localhost:3000/hello')
app.listen(3000)
