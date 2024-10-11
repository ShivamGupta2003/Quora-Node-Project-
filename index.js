const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const path = require("path")
const methodOverride = require("method-override");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "1a",
        username: "Shivu",
        content: "I LOVE MY BACHHA ",
    },
    {
        id: "2a",
        username: "Shivam Gupta",
        content: "I LOVE MY Family",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); // Generate unique ID
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
}); 

  app.patch("/posts/:id", (req, res)=>{

    let {id}= req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=>p.id===id);
    post.content = newcontent ;
    res.redirect("/posts");

  });

  app.get("/posts/:id/edit", (req, res)=>{

    let {id}= req.params;
    let post = posts.find((p)=>p.id===id);
    res.render("edit.ejs",{post});

  });

    app.delete("/posts/:id", (req,res)=>{
        let {id}= req.params;
     
         posts = posts.filter((p)=>p.id!==id);
         res.redirect("/posts");

    });

  
app.listen(port, () => {
    console.log("app is listening on port 3000");
});
