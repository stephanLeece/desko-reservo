import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.post(`/employee`, async (req, res) => {
    const result = await prisma.employee.create({
        data: {
            name: "Alice",
            email: "alice@prisma.io",
        }
    })
    res.json(result)
})

app.post(`/desk`, async (req, res) => {
    const result = await prisma.desk.create({
        data: {
            title: "Desko",
        }
    })
    res.json(result)
})

app.put('/desk/:id', async (req, res) => {
    const { id } = req.params
    const updatedDesk = await prisma.desk.update({
        where: {
            id: Number(id),
        },
        data: {
            Employee: {
                create: {
                    name: "buddy",
                    email: "stephan@prisma.io",
                },
            },
        },
    })
    res.json(updatedDesk)
})

app.delete(`/employee/:id`, async (req, res) => {
    const { id } = req.params
    const deletedEmployee = await prisma.employee.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(deletedEmployee)
})

app.get(`/employee`, async (req, res) => {
    const allEmployee = await prisma.employee.findMany()
    res.json(allEmployee)
})

app.get(`/desk`, async (req, res) => {
    const allDesks = await prisma.desk.findMany({
        include: {
            Employee: true,
        },
    })
    res.json(allDesks)
})

app.get(`/employee/:id`, async (req, res) => {
    const { id } = req.params
    const employee = await prisma.employee.findOne({
        where: {
            id: Number(id),
        },
    })
    res.json(employee)
})

app.get(`/desk/:id`, async (req, res) => {
    const { id } = req.params
    const desk = await prisma.desk.findOne({
        where: {
            id: Number(id),
        },
    })
    res.json(desk)
})

const server = app.listen(3000, () =>
    console.log(
        '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
    ),
)