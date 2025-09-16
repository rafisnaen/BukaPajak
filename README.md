# BukaPajak
##### When Tax Distribution Have Broad & Wider View In Transparency 📄👀

## 📝Installation Guide - BukaPajak
Panduan ini menjelaskan cara instalasi, setup dependencies, dan menjalankan aplikasi **BukaPajak**.
## 1. Prasyarat
Pastikan software berikut sudah terinstal dengan baik:

- **Node.js** versi >= 18, Link =  [🤩Node.js](https://nodejs.org/)
- **npm** versi >= 9, Link = [🔨npm](https://www.npmjs.com/) >= 9
- **Go** versi >= 1.25, Link = [💙Go](https://go.dev/dl/)
- **Metamask** browser extension, Link = [🦊Metamask](https://metamask.io/download/)

### Cek versi yang terinstall
📟 Cek pada terminal :
```bash
node -v
npm -v
go version
```
## 2. Clone Repository
📟 Clone source code dari repository github **BukaPajak** :
```bash
git clone https://github.com/username/bukapajak.git
cd bukapajak    
```
## 3. Install Dependencies
#### 3.1 Frontend
📟 Masuk ke folder Frontend dan install dependencies :
```bash
cd frontend
npm install
```
#### 3.2 Backend
📟 Masuk ke folder Backend dan install dependencies :
```bash
cd ../backend
go mod download
```
## 4. Run Web
#### 4.1 Backend
📟 Jalankan Backend pada terminal :
```bash
cd backend
go run main.go
```
Server Backend _secara default_ akan berjalan di:
```bash
http://localhost:8000
```
#### 4.2 Frontend
📟 Buka terminal baru, Jalankan Frontend :
```bash
cd frontend
npm run dev
```
Server Frontend *secara default* akan berjalan di :
```bash
http://localhost:8001
```
## 5. Setup Metamask
**1.** Install [🦊Metamask Extension](https://metamask.io/download/) di browser 🌐. <br>
**2.** Buat/Import wallet kamu 💳 <br>
**3.** Hubungkan ke WebApp ketika diminta saat login ✅

