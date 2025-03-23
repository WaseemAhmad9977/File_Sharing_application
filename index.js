import express from 'express'
const app = express()
app.use(express.static('view'))
app.listen(8080,()=>{
    console.log('8080 port is listening')
})
