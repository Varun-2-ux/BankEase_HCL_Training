# BankEase – Full Stack Digital Banking Application

## Stack

- Frontend: Angular 20 + TypeScript
- Backend: Spring Boot 4.1.0 + Java
- Security: Spring Security + JWT + BCrypt
- Persistence: Spring Data JPA + Hibernate
- Database: MySQL

## Run backend

1. Create/use the `bankease` MySQL database.
2. Check `backend/src/main/resources/application.properties` and make sure the MySQL password matches your local MySQL
   root password.
3. Open `backend` in IntelliJ IDEA.
4. Run `BankEaseApplication.java`.
5. Backend: `http://localhost:8080`

## Run frontend

```powershell
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

## Frontend-backend mapping

The Angular service maps directly to these backend groups:

- `/api/auth/**`
- `/api/accounts/**`
- `/api/beneficiaries/**`
- `/api/transfers/**`
- `/api/bill-payments/**`
- `/api/loans/**`
- `/api/investments/**`
- `/api/admin/**`

## UI improvements

- Light / dark mode with saved preference
- Responsive mobile sidebar
- Modern banking dashboard
- Consistent cards, forms, tables, status badges and modals
- Theme toggle on authenticated and authentication screens

## Important

`node_modules` is intentionally not included in the distribution ZIP. Run `npm install` once inside `frontend`.
