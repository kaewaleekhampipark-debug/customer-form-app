# Customer Form - คู่มือ Deploy

## โครงสร้างไฟล์
```
customer-form-app/
├── index.html        ← หน้าเว็บหลัก
├── vercel.json       ← config Vercel
├── api/
│   └── proxy.js     ← serverless function (ซ่อน API Key)
└── README.md
```

---

## ขั้นตอน Deploy (ทำครั้งเดียว ~10 นาที)

### 1. สมัคร GitHub (ถ้ายังไม่มี)
- ไปที่ https://github.com → Sign up

### 2. สร้าง Repository
- กด **New repository**
- ตั้งชื่อ เช่น `customer-form`
- เลือก **Public**
- กด **Create repository**

### 3. อัปโหลดไฟล์
- กด **uploading an existing file**
- ลากไฟล์ทั้งหมด (`index.html`, `vercel.json`, และโฟลเดอร์ `api/`) ใส่
- กด **Commit changes**

### 4. สมัคร Vercel (ฟรี)
- ไปที่ https://vercel.com → Sign up with GitHub

### 5. Import Project
- กด **New Project** → เลือก repository `customer-form`
- กด **Deploy** (ไม่ต้องแก้ค่าอะไร)

### 6. ใส่ API Key (สำคัญมาก!)
- ไปที่ Project → **Settings** → **Environment Variables**
- เพิ่ม:
  - **Name:** `ANTHROPIC_API_KEY`
  - **Value:** ใส่ API Key จาก https://console.anthropic.com
- กด **Save**
- กด **Redeploy** (เพื่อให้ค่า env มีผล)

### 7. เสร็จแล้ว!
- Vercel จะให้ URL เช่น `https://customer-form-abc123.vercel.app`
- แชร์ URL นี้ให้คนอื่นใช้ได้เลย

---

## หมายเหตุ
- Vercel ฟรีสำหรับ 100GB bandwidth/เดือน
- API Key จะ**ไม่ถูกเปิดเผย** ต่อผู้ใช้ เพราะซ่อนไว้ใน serverless function
- ทุกครั้งที่แก้ไขไฟล์บน GitHub → Vercel จะ deploy ใหม่อัตโนมัติ
