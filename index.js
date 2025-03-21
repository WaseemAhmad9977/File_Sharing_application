import express from 'express'
const app = express()
app.use(express.static('view'))
app.listen(3000,()=>{
    console.log('3000 port is listening')
})
