const express = require('express');
const multer = require('multer');
const app = express()
app.listen(8001, () => {
    console.log('service running at PORT: 8001')
})
const storage = multer.diskStorage({ // ในส่วนนี้จะเป็น config ของ Multer ว่าจะให้เก็บไฟล์ไว้ที่ไหน และ Rename ชื่อไฟล์
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png")
    }
})
const upload = multer({ storage: storage }) // ใส่ Config ลงไป
app.get('/', (req, res) => {
    res.send('Hello Upload')
})
app.post('/upload', upload.single('file'), (req, res) => { // สร้าง method POST ขึ้นมาและ ใส่ middleward upload โดนตั้งชื่อ paramที่จะรับว่า "file" ไว้หรือจะเป็นอย่างอื่นก็ได้ตามที่ต้องการ เข้าไป ส่วน.singleจะเป็นตัวกำหนดว่าอัพโหลดได้ทีละกี่ไฟล์ ลองไปอ่านใน Doc ของ Multer ดูครับ จะมี.single.array 9ล9
    res.send(req.file) // และให้ Response ค่าไฟล์ออกไป
})
