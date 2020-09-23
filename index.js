const express = require("express");
const shortid = require("shortid");
const server = express();

let users = [
  {
    id: shortid.generate(),
    name: "John Doe",
    bio: "No one really knows about John Doe",
  },
];

server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  newUser.id = shortid.generate();

  users.push(newUser);

  res.status(201).json(users);
});

server.get("/api/users", (req, res) => {
  res.status(200).send(users);
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const found = users.find((u) => u.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = users.find((u) => u.id === id);
  users = users.filter((u) => u.id !== id);
  res.status(200).json(deleted);
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  const found = users.find((u) => u.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
