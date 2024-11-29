const express = require('express');
const sqlite3 = require('sqlite3').verbose();  // นำเข้า SQLite3
const cors = require('cors');  // ใช้ CORS

const app = express();

// เปิดใช้งาน CORS
app.use(cors());

// เปิดใช้งานการ parse JSON
app.use(express.json());

// เชื่อมต่อกับฐานข้อมูล SQLite
const db = new sqlite3.Database('./sales.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// สร้างตารางใน SQLite
db.run('CREATE TABLE IF NOT EXISTS sales (region TEXT, sales INTEGER)', (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists.');
  }
});

// สร้าง API สำหรับดึงข้อมูล
app.get('/api/sales', (req, res) => {
  db.all('SELECT * FROM sales', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching data' });
      console.error('Error fetching data:', err.message);
    } else {
      res.json(rows);
    }
  });
});

// API สำหรับเพิ่มข้อมูล
app.post('/api/sales', (req, res) => {
  const { region, sales } = req.body;
  const query = 'INSERT INTO sales (region, sales) VALUES (?, ?)';
  db.run(query, [region, sales], (err) => {
    if (err) {
      res.status(500).json({ message: 'Error inserting data' });
      console.error('Error inserting data:', err.message);
    } else {
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

// เส้นทางสำหรับ /api หรืออื่นๆ ที่คุณต้องการ
app.get('/api', (req, res) => {
    res.send('Hello, API!');
  });
  
  // หากไม่ได้กำหนดเส้นทางอื่นๆ ให้จัดการ route นี้ด้วย
  app.get('/', (req, res) => {
    res.send('Hello from root route!');
  });

// เริ่มเซิร์ฟเวอร์
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
