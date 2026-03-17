# 🎯 SUPPORT.IT - מערכת ניהול קריאות שירות

מערכת Helpdesk מקצועית ומודרנית לניהול קריאות שירות, המקשרת בין לקוחות, סוכני תמיכה ומנהלים. 
הפרויקט כולל צד שרת (Node.js + TypeScript) וצד לקוח (React + TypeScript) עם דגש על אבטחה, ממשק משתמש מודרני ועיצוב כחול אלגנטי.

## ✨ תכונות מרכזיות

### 🎨 עיצוב ו-UI/UX
- **ערכת צבעים כחולה מודרנית** - גרדיאנטים כחולים (#1976d2) בכל האפליקציה
- **Material-UI Components** - רכיבים מעוצבים עם Chips, Avatars, Cards ואנימציות
- **ממשק RTL מלא** - תמיכה מושלמת בעברית עם עיצוב מימין לשמאל
- **Responsive Design** - מותאם לכל גדלי מסך
- **אנימציות חלקות** - מעברים ואפקטי hover מלוטשים

### 🔐 אבטחה ואימות
- **JWT Authentication** - אימות מבוסס טוקנים מאובטח
- **RBAC (Role-Based Access Control)** - ניהול הרשאות לפי תפקידים
- **Protected Routes** - הגנה על נתיבים רגישים
- **Password Visibility Toggle** - אפשרות להצגה/הסתרה של סיסמאות

### 📋 ניהול קריאות
- **יצירת קריאות חדשות** - טופס מעוצב עם בחירת עדיפות (נמוכה/בינונית/גבוהה)
- **מעקב סטטוס דינמי** - פתוח / בטיפול / סגור עם צבעים מובחנים
- **מערכת תגובות** - היסטוריית תגובות מלאה עם חותמות זמן
- **פרטי קריאה מפורטים** - תצוגה מסודרת של כל המידע הרלוונטי

### 👥 ניהול משתמשים
- **3 סוגי משתמשים:** לקוח (Customer), סוכן (Agent), מנהל (Admin)
- **Dashboard מותאם אישית** - לוח בקרה לפי תפקיד המשתמש
- **Navbar מעוצב** - ניווט נוח עם הצגת שם המשתמש וכפתור התנתקות

## 🚀 טכנולוגיות

### Frontend
- **React 18** + **TypeScript** - ספריית UI מודרנית עם type safety
- **Vite** - כלי build מהיר וחדשני
- **Material-UI (MUI)** - ספריית רכיבים מעוצבת
- **React Router v6** - ניהול ניווט ונתיבים
- **Axios** - תקשורת HTTP עם השרת
- **Context API** - ניהול state גלובלי (Auth, Toast)

### Backend
- **Node.js** + **Express** - שרת REST API
- **TypeScript** - פיתוח מאובטח עם טיפוסים
- **SQLite3** - מסד נתונים קל ומהיר
- **JWT** - אימות וניהול סשנים
- **ts-node-dev** - פיתוח עם hot reload

## 🏗️ ארכיטקטורת המערכת

הפרויקט בנוי במבנה **Layered Architecture** נקי ומסודר:

### Backend Structure
```
src/
├── controllers/     # ניהול בקשות HTTP והחזרת תשובות
├── services/        # לוגיקה עסקית ואימות נתונים
├── repositories/    # שכבת Data Access למסד הנתונים
├── middleware/      # אימות JWT והרשאות
└── routes/          # הגדרת endpoints
```

### Frontend Structure
```
src/
├── components/      # רכיבים משותפים (Navbar, Toast)
├── pages/          # עמודי האפליקציה
├── context/        # Context providers (Auth)
├── services/       # Axios configuration
└── App.tsx         # ניתוב ראשי
```

## 🔑 תפקידים והרשאות

| תפקיד | הרשאות |
|:------|:--------|
| **👤 Customer (לקוח)** | הרשמה, התחברות, יצירת קריאות חדשות, הוספת תגובות לקריאות שלו, צפייה בקריאות שלו בלבד |
| **🎧 Agent (סוכן)** | צפייה בכל הקריאות במערכת, עדכון סטטוסים (פתוח/בטיפול/סגור), הוספת תגובות לכל קריאה |
| **👨‍💼 Admin (מנהל)** | גישה מלאה לכל התכונות, ניהול משתמשים, צפייה בלוח בקרה מפורט, סטטיסטיקות |

## 🛠️ הוראות התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn
- Git

### 1️⃣ הרצת Backend

```bash
# נווט לתיקיית השרת
cd helpdesk-api-main

# התקן תלויות
npm install

# הרץ את השרת במצב פיתוח
npm run dev
```

השרת יעלה על: **http://localhost:4000**

### 2️⃣ הרצת Frontend

```bash
# נווט לתיקיית הלקוח (בטרמינל נפרד)
cd React-Project-main

# התקן תלויות
npm install

# הרץ את האפליקציה במצב פיתוח
npm run dev
```

האפליקציה תעלה על: **http://localhost:5173**

### 3️⃣ גישה למערכת

1. פתח דפדפן וגש ל-**http://localhost:5173**
2. צור חשבון חדש או התחבר עם משתמש קיים
3. התחל לנהל קריאות שירות!

## 📁 מבנה הפרויקט

```
Dvori-Hofman/
├── React-Project-main/          # Frontend - React Application
│   ├── src/
│   │   ├── components/          # רכיבים משותפים
│   │   ├── pages/              # עמודי האפליקציה
│   │   ├── context/            # Context API
│   │   └── services/           # API services
│   └── package.json
│
└── helpdesk-api-main/          # Backend - Node.js API
    ├── src/
    │   ├── controllers/        # HTTP handlers
    │   ├── services/           # Business logic
    │   ├── repositories/       # Database access
    │   └── middleware/         # Auth & validation
    └── package.json
```

## 🎨 עיצוב ונושא

האפליקציה מעוצבת בערכת צבעים כחולה מודרנית:
- **צבע ראשי:** `#1976d2` (Material Blue)
- **גרדיאנטים:** כחול בהיר לכחול כהה
- **רכיבים:** Material-UI עם התאמות אישיות
- **אנימציות:** Smooth transitions ו-hover effects

## 🔒 אבטחה

- **JWT Tokens** - כל בקשה מאומתת עם טוקן
- **Password Hashing** - סיסמאות מוצפנות במסד הנתונים
- **Role-Based Access** - הרשאות לפי תפקיד משתמש
- **Protected Routes** - נתיבים מוגנים ב-Frontend

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - הרשמת משתמש חדש
- `POST /auth/login` - התחברות למערכת

### Tickets
- `GET /tickets` - קבלת כל הקריאות (לפי הרשאות)
- `GET /tickets/:id` - קבלת פרטי קריאה
- `POST /tickets` - יצירת קריאה חדשה
- `PATCH /tickets/:id` - עדכון סטטוס קריאה

### Comments
- `POST /tickets/:id/comments` - הוספת תגובה לקריאה

### Users (Admin only)
- `GET /users` - קבלת רשימת משתמשים

## 🚀 טכנולוגיות נוספות

- **Vite** - Build tool מהיר עם HMR
- **TypeScript** - Type safety בכל הפרויקט
- **Material Icons** - אייקונים מעוצבים
- **React Context** - State management
- **Axios Interceptors** - ניהול טוקנים אוטומטי

## 👨‍💻 פותח על ידי

**Dvori Hofman**  
פרויקט Full Stack - React + Node.js  
מערכת ניהול קריאות שירות מקצועית

## 📝 רישיון

MIT License - חופשי לשימוש ושינוי

---

**💙 נבנה עם React, TypeScript, Material-UI ואהבה**
