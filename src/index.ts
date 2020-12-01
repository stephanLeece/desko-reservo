import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

// Post requests

app.post(`/register`, async (req, res) => {
    const result = await prisma.user.create({
        data: {
            name: "test user",
            email: "test email"
        }
    })
    res.json(result)
})

app.post(`/comment`, async (req, res) => {
    const result = await prisma.comment.create({
        data: {
            text: "This is a lovely comment",
            Photo: {
                connect: {
                  id: 1,
                },
              },
              User: {
                connect: {
                  id: 1,
                },
              },
        }
    })
    res.json(result)
})

app.post(`/photo`, async (req, res) => {
    console.log('body massage', req?.body?.data)
    const result = await prisma.photo.create({
        data: {
            name: "lovely photo",
            imgurl:"lovely image url",
            User: {
                connect: {
                  id: 123,
                },
              },
        }
    })
    return res.json(result)
})

// get requests

app.get(`/photos`, async (req, res) => {
    const allPhotos = await prisma.photo.findMany()
    return res.json(allPhotos)
})

app.get(`/photo:photoId`, async (req, res) => {
    const id = req.params.photoId;
    const photoById = await prisma.photo.findOne(
        {
            where: {
                id: parseInt(id),
            },
        }
    )
    return res.json(photoById)
})

app.get(`/photos:userId`, async (req, res) => {
    const userId = req.params.userId;
    const photosByUser = await prisma.photo.findMany({
        where: {
            userId: parseInt(userId),
        },
    })
    return res.json(photosByUser)
})

app.get(`/comments:photoId`, async (req, res) => {
    const photoId = req.params.photoId;
    const commentsByPhotoId = await prisma.comment.findMany({
        where: {
          photoId: parseInt(photoId),
        }
      })
    return res.json(commentsByPhotoId)
})

const port = process.env.PORT || 2077;
const server = app.listen(process.env.PORT || 2077, () =>
    console.log(
        `Server ready at: http://localhost:${port}`,
    ),
)