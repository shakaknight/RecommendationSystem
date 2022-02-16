const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");
const bodyParser = require("body-parser");

// Load in the mongoose models
const { List, Request, Task, User,Resource, Publication } = require("./db/models");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
// const db=require('./db/database');
/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// app.options('*', cors())



/* User methods */

// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
  let token = req.header("x-access-token");

  // verify the JWT
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
    if (err) {
      // there was an error
      // jwt is invalid - * DO NOT AUTHENTICATE *
      res.status(401).send(err);
    } else {
      // jwt is valid
      req.user_id = decoded._id;
      next();
    }
  });
};

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
  // grab the refresh token from the request header
  let refreshToken = req.header("x-refresh-token");

  // grab the _id from the request header
  let _id = req.header("_id");

  User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
      if (!user) {
        // user couldn't be found
        return Promise.reject({
          error:
            "User not found. Make sure that the refresh token and user id are correct",
        });
      }

      // if the code reaches here - the user was found
      // therefore the refresh token exists in the database - but we still have to check if it has expired or not

      req.user_id = user._id;
      req.userObject = user;
      req.refreshToken = refreshToken;

      let isSessionValid = false;

      user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
          // check if the session has expired
          if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
            // refresh token has not expired
            isSessionValid = true;
          }
        }
      });

      if (isSessionValid) {
        // the session is VALID - call next() to continue with processing this web request
        next();
      } else {
        // the session is not valid
        return Promise.reject({
          error: "Refresh token has expired or the session is invalid",
        });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};


/**
 * POST /users
 * Purpose: Sign up
 */
app.post("/users", (req, res) => {
  // User sign up

  let body = req.body;
  let newUser = new User(body);

  newUser
    .save()
    .then(() => {
      return newUser.createSession();
    })
    .then((refreshToken) => {
      // Session created successfully - refreshToken returned.
      // now we geneate an access auth token for the user

      return newUser.generateAccessAuthToken().then((accessToken) => {
        // access auth token generated successfully, now we return an object containing the auth tokens
        return { accessToken, refreshToken };
      });
    })
    .then((authTokens) => {
      // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
      res
        .header("x-refresh-token", authTokens.refreshToken)
        .header("x-access-token", authTokens.accessToken)
        .send(newUser);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

/**
 * POST /users/login
 * Purpose: Login
 */
app.post("/users/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findByCredentials(email, password)
    .then((user) => {
      return user
        .createSession()
        .then((refreshToken) => {
          // Session created successfully - refreshToken returned.
          // now we geneate an access auth token for the user

          return user.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken };
          });
        })
        .then((authTokens) => {
          // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
          res
            .header("x-refresh-token", authTokens.refreshToken)
            .header("x-access-token", authTokens.accessToken)
            .send(user);
        });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get("/users/me/access-token", verifySession, (req, res) => {
  // we know that the user/caller is authenticated and we have the user_id and user object available to us
  req.userObject
    .generateAccessAuthToken()
    .then((accessToken) => {
      res.header("x-access-token", accessToken).send({ accessToken });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// authenticate,
/**
 * GET /user-info
 * Purpose: returns user's info
 */
app.post("/user-info", authenticate, (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log("GET");
  User.find({
    email: req.body.email,
  }).then((info) => {
    res.send(info);
  });
});


/* task manager methods */

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
app.post("/task", authenticate, (req, res) => {
  // We want to create a new task for a specified list
  console.log(req.body.title);
  console.log(req.user_id);
  let title = req.body.title;
  let newTask = new Task({
    title,
    _userId: req.user_id,
  });
  newTask.save().then((newTaskDoc) => {
    // the full list document is returned (incl. id)
    console.log(newTaskDoc);
    res.send(newTaskDoc);
  });
});

// /**
//  * GET /lists/:listId/tasks
//  * Purpose: Get all tasks in a specific list
//  */
app.get("/task", authenticate, (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log("GET");
  
  Task.find({
    _userId: req.user_id,
  }).then((tasks) => {
    res.send(tasks);
  });
});

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */

app.patch("/taskUpdate/:taskId", authenticate, (req, res) => {
  // We want to update an existing task (specified by taskId)
  console.log("Hello");
  console.log(req.body);
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({ message: "Updated successfully." });
  });
});

// /**
//  * DELETE /lists/:id
//  * Purpose: Delete a list
//  */
// authenticate,
app.delete("/task/:id", (req, res) => {
  // We want to delete the specified list (document with id in the URL)
  Task.findOneAndRemove({
    _id: req.params.id,
    // _userId: req.user_id
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});


/* Mentor Mentee methods */

// /**
//  * GET /get-request
//  * Purpose: Get all tasks in a specific list
//  */
app.get("/getRequests", (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log("GET");
  
  Request.find().then((results) => {
    res.send(results);
  });
});


/**
 * POST /request-mentor
 * Purpose: Create a new request for mentor
 */
//autenticate
app.post("/request-mentor", (req, res) => {
  console.log("request-mentor");
  // console.log(req.body)
  let newRequest = new Request({
    mentor_email: req.body.mentor_email,
    mentee_email: req.body.mentee_email,
  });
  // console.log(newRequest)
  newRequest.save().then((newRequest) => {
    res.send(newRequest);
  });
});

/**
 * GET /request-mentee
 * Purpose: returns mentor's request
 */
// authenticate,
app.post("/request-mentee", (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log(req.body.email);
  Request.find({
    mentor_email: req.body.email,
  }).then((result) => {
    res.send(result);
  });
});

/**
 * DELETE /delete-request
 * Purpose: returns mentor's request
 */
app.delete("/delete-request/:id", (req, res) => {
  // We want to delete the specified request
  console.log("delete-request");
  // Request.findByIdAndRemove
  console.log(req.params.id);
  Request.findByIdAndRemove({
    _id: req.params.id,
  }).then((removedRequest) => {
    console.log(removedRequest);
    res.send(removedRequest);
  });
});

/**
 * PATCH /acceptMentor
 * Purpose: Update an the status of the request
 */

app.patch("/acceptMentor", (req, res) => {
  // We want to update an existing task (specified by taskId)
  console.log("acceptMentor");
  console.log(req.body);
  Request.findOneAndUpdate(
    {
      mentor_email: req.body.mentor_email,
      mentee_email: req.body.mentee_email,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({ message: "Updated successfully." });
  });
});


/**
 * PATCH /setMentor
 * Purpose: Update the member part of the mentor and mentee in mongoDB
 */

app.patch("/setMentor", (req, res) => {
  // We want to update an existing task (specified by taskId)
  console.log("acceptMentor");
  console.log(req.body);

  User.find({
    email: req.body.email,
  }).then((info) => {
    console.log(info[0]["members"].length)
    console.log(info[0]["user_type"])
    if(info[0]["user_type"]=="mentee" && info[0]["members"].length<=0){
        User.updateOne(
              {email: req.body.email},
              {
                $push: {
                members: {
                    $each: [ { member_email : req.body.member_email } ],
                }
              }
              }
        ).then(() => {
          res.send({ message: "Updated successfully." });
        });      
    }else if(info[0]["user_type"]=="mentor"){
      User.updateOne(
              {email: req.body.email},
              {
                $push: {
                members: {
                    $each: [ { member_email : req.body.member_email } ],
                }
              }
              }
        ).then(() => {
          res.send({ message: "Updated successfully." });
        });      
    }else{
        res.status(406).send({message: "Unable to modify"});
    }
  });
});

/* Resource methods */


/**
 * POST /create-resource
 * Purpose: creation of new resource
 */

app.post("/create-resource", (req, res) => {
  // We want to create a new resource
  console.log(req.body);
  let title = req.body.title;
  let newResource = new Resource({
    title,
    pages: req.body.pages,
    link: req.body.link,
  });
  newResource.save().then((newResultDoc) => {
    // the full list document is returned (incl. id)
    console.log(newResultDoc);
    res.send(newResultDoc);
  });
});



/**
 * DELETE /delete-resource
 * Purpose: delete resource
 */
app.delete("/delete-resource/:id", (req, res) => {
  // We want to delete the specified request
  console.log("delete-request");
  // Request.findByIdAndRemove
  console.log(req.params.id);
  Resource.findByIdAndRemove({
    _id: req.params.id,
  }).then((removedResource) => {
    console.log(removedResource);
    res.send(removedResource);
  });
});


// /**
//  * GET /resource
//  * Purpose: Get all resource
//  */
app.get("/resources", (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log("GET");
  Resource.find().then((tasks) => {
    res.send(tasks);
  });
});



/* Publication methods */


/**
 * POST /create-publication
 * Purpose: creation of new resource
 */

app.post("/create-publication", (req, res) => {
  // We want to create a new publication
  console.log(req.body);
  let title = req.body.title;
  let newPublication = new Publication({
    title,
    link: req.body.link,
  });
  newPublication.save().then((newResultDoc) => {
    
    // the full list document is returned.
    console.log(newResultDoc);
    res.send(newResultDoc);
  });

});



/**
 * DELETE /delete-publication
 * Purpose: delete publication
 */

app.delete("/delete-publication/:id", (req, res) => {
  
  // We want to delete the specified publication
  console.log("delete-publication");
  // Request.findByIdAndRemove
  console.log(req.params.id);
  Publication.findByIdAndRemove({
    _id: req.params.id,
  }).then((removedPublication) => {
    console.log(removedPublication);
    res.send(removedPublication);
  });

});


// /**
//  * GET /publications
//  * Purpose: Get all publication
//  */
app.get("/publications", (req, res) => {
  // We want to return all tasks that belong to a specific list (specified by listId)
  console.log("GET-Publications");
  Publication.find().then((tasks) => {
    res.send(tasks);
  });
});

/* END MIDDLEWARE  */

/* ROUTE HANDLERS */


/* HELPER METHODS */
let deleteTasksFromList = (_listId) => {
  Task.deleteMany({
    _listId,
  }).then(() => {
    console.log("Tasks from " + _listId + " were deleted!");
  });
};

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
