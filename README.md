# Node server for the Lendsqr backend task

A backend application written with expressjs for a wallet application

## Dependencies

- [Node.js 14.17.5 or later](https://nodejs.org/en/)
- [Typescript 4.5.2 or later](https://www.typescriptlang.org/)

## Installation/Getting Started

First, clone the project:

```bash
git clone https://github.com/Bolu1/lendsqr-backend-task.git
```

CD into the project directory:

```bash
cd lendsqr-backend-task
```

Install dependencies:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Test the application:

```bash
npm run test

```

Server now runs on [http://localhost:8080](http://localhost:8080).

Live version [here (https://adetifaboluwatife-lendsqr-be-test.onrender.com)](https://adetifaboluwatife-lendsqr-be-test.onrender.com)

API Docs [here](https://documenter.getpostman.com/view/18378761/2s8Z73zBVp)


## Database Structure:
The database consists of the users and transaction tables. The users table consists of the following columns:

`id`, `slug`, `email`, `account_number`, `firstname`, `phone`, `lastname`, `password`, `balance`, `created_at` and `updaed_at`.

I chose to not create a wallet table to keep it simple,but this db implemntation can also work a wallet table.

While the tansaction table consists of the following columns:

`id`, `slug`, `creditor`, `debtor`, `amount`, `reference`, `type`, `status`, `created_at` and `updated_at`

Here's and ER diagram for the db structure

![Screenshot from 2023-01-06 16-09-44](https://user-images.githubusercontent.com/68053657/211042863-cb5f0234-79fa-4ecb-88c6-57a13c355458.png)

