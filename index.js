const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride = require('method-override')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.listen("3000", () => {
  console.log("Server is running on port 3000");
});

let data = [
  {
    id: uuidv4(),
    username: "saqib aziz",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "Muhammad Arfan",
    content: "All members are like my brothers and sisters",
  },
  {
    id: uuidv4(),
    username: "Usama bhai",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "arfan",
    content: "ZIMO is Best",
  },
  {
    id: uuidv4(),
    username: "shahrukh",
    content: "Work hard to achieve your dreams.",
  },
];

// index route
app.get("/", (req, res) => {
  res.render("index.ejs", { data });
});

// get all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { data });
});

// route  to create a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
// new post created
app.post('/posts',(req,res)=>{
  let {username,content}=req.body;
  let  id=uuidv4();
  data.push({id,username,content});
  res.redirect('/posts')
})

//get specific user
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = data.find((p) => id === p.id);
  res.render("show.ejs",{post}); 
  console.log(post)
});



//patch request
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
    const  newContent  = req.body.content;
    const post = data.find((p) => id === p.id);
    post.content = newContent;
  res.redirect("/posts"); 

});

//edit post
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
    const post = data.find((p) => id === p.id);
  res.render("edit.ejs",{post}); 
});


//delete Post

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
   data = data.filter((p) => id !== p.id);
  res.redirect('/posts'); 
});





