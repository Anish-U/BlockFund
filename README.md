<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./client/public/logo512.png" alt="BlockFund Logo"></a>
</p>

<h1 align="center">BlockFund💸</h1>


<p align="center"> A Blockchain based crowdfunding application using solidity, truffle and nodejs.
    <br> 
</p>

----

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Deployment](#deployment)

----


## 🏁 Getting Started <a name = "getting_started"></a>

BlockFund web application uses <b>node.js</b> along with the <b>express.js</b> framework to develop the server and <b>mongoDB</b> as database and <b>mongoose</b> as object data modeling library. For the frontend aspect we have used <b>React</b>. For the blockchain aspect, we have used the <b>ethereum</b> blockchain to deploy the smart contracts and <b>web3.js</b> library to interact with the ethereum node and the frontend. We have used <b>Ganache</b> and <b>Truffle</b> for creating a remote Blockchain environment.

### Prerequisites

The following dependencies need to be installed.

```
  - node.js
  - npm
  - mongodb / mongodb atlas
  - web3.js
  - Ganache
  - Truffle
```

### Installing ⬇️

Retrieve the project (clone the repository using the command)

  ```git
    git clone https://github.com/Anish-U/BlockFund.git
  ```

After cloning the repository, navigate into the directories (server) and run the following command to install all the dependencies 

  ```
    npm install
  ```

### Setting up environment

Setup the environment variables by creating .env file in server directory

  ```
  SERVER_PORT="5000"
  MONGO_USERNAME="mongo_username"
  MONGO_PASSWORD="mongo_password"

  ```

----

## 🚀 Deployment <a name = "deployment"></a>

In new terminal, run the command (to run development server)

  ```
    npm run devServer 
  ```

----