import axios from 'axios'

const getIP = async ()=> axios.get('http://localhost:3000/api/IP')

let IP = 'localhost'

let catagoryes = `http://${IP}:3000/api/catagoryes`
let teches = `http://${IP}:5000/api/teches`
let workers = `http://${IP}:5000/api/workers`

let addCount = `http://${IP}:5000/api/addCount`
let deleteCount = `http://${IP}:5000/api/deleteCount`
let deletePart = `http://${IP}:5000/api/deletePart`
let addPart = `http://${IP}:5000/api/addPart`
let addOrder = `http://${IP}:5000/api/addOrder`
let updatePart = `http://${IP}:5000/api/updatePart`


export default{
    catagoryes:catagoryes,
    teches:teches,
    workers:workers,

    addCount:addCount,
    deleteCount:deleteCount,
    deletePart:deletePart,
    addPart:addPart,
    addOrder:addOrder,
    updatePart:updatePart
}