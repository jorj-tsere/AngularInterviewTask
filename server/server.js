const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

// console.log("jsonServer", jsonServer);
const server = jsonServer.create();
const router = jsonServer.router("./server/database.json");
const userdb = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
const SECRET_KEY = "132456789";
const expiresIn = "2h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

// Login to one of the users from ./users.json
server.post("/api/auth/getAccessToken", (req, res) => {
  const { username, password } = req.body;
  if (isAuthenticated({ username, password }) === false) {
    const response = {
      success: false,
      status: 401,
      body: {
        showMessage: true,
        message: 'ელ.ფოსტა ან პაროლი არასწორია',
      },
    };

    res.status(401).json(response);
    return;
  }
  const access_token = createToken({ username });
  const response = {
    success: true,
    status: 200,
    body: {
      showMessage: false,
      message: "Successfully Logged In",
      data: {
        accessToken: access_token,
      },
    },
  };
  res.status(200).json(response);
});

server.use(/^(?!\/api\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const response = {
      success: false,
      status: 401,
      body: {
        showMessage: true,
        message: "Error in authorization format",
      },
    };

    res.status(401).json(response);
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const errorDesc = verifyTokenResult.message;
      const response = {
        success: false,
        status: 401,
        body: {
          showMessage: errorDesc === 'jwt expired',
          verifyTokenResult: verifyTokenResult,
          message: errorDesc === 'jwt expired' ?  'თქვენი სესიის დრო ამოიწურა. გთხოვთ გაიაროთ ავტორიზაცია' : 'Invalid Access Token',
        },
      };

      res.status(401).json(response);
      return;
    }
    next();
  } catch (err) {
    const response = {
      success: false,
      status: 401,
      body: {
        showMessage: false,
        message: "unknown error",
      },
    };

    res.status(401).json(response);
  }
});

server.use("/api", router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
