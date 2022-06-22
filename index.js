//eu uso mysql2
const express = require("express");
const app = express();
const fileupload = require('express-fileupload');
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(fileupload());

// seus dados do sql
const con = mysql.createConnection({
  host: "",
  port: "",
  user: "",
  password: "",
  database: ""
});

// toppage
app.post("/toppage", (req, res) => {
  const hora = req.body.hora;
  const data = req.body.data;

  con.query("update top set hora=?, data=? where id=1", [hora, data], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(result);
    }
  });
});

app.get("/pushtoppage", function (req, res) {
  con.query("select * from top", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// toppage

// promo
app.post("/insert", (req, res) => {
  const id = req.body.id;
  const link = req.body.link;
  const porcentagem = req.body.porcentagem;
  const titulo = req.body.titulo;
  const preco = req.body.preco;
  const nameimage = req.body.nameimage;
  

  con.query("insert into promo (id, link, porcentagem, titulo, preco, img) values (?,?,?,?,?,?)", [id, link, porcentagem, titulo, preco, nameimage], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(result);
    }
  });
});

// salva imagem de forma local, mas pode ser alterado para ser salvo diretamente no bd
app.post("/img", (req, res) => {
  const image = req.files.image;
  image.mv(`img/${image.name}`);
  return res.send(image);
});

app.get("/push", function (req, res) {
  con.query("select * from promo", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  con.query("delete from promo where id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// promo

// destaques
app.post("/destaques", (req, res) => {
  const idnew = req.body.idnew;
  const texto = req.body.texto;
  const nameimgnew = req.body.nameimgnew;

  con.query("insert into destaques (id, img, texto) values (?,?,?)", [idnew, nameimgnew, texto], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(result);
    }
  });
});

// salva imagem de forma local, mas pode ser alterado para ser salvo diretamente no bd
app.post("/imgdestaques", (req, res) => {
  const imgnew = req.files.imgnew;
  imgnew.mv(`img/${imgnew.name}`);
  return res.send(imgnew);
});

app.get("/pushdestaques", function (req, res) {
  con.query("select * from destaques", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deldestaques/:id", (req, res) => {
  const id = req.params.id;
  con.query("delete from destaques where id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// destaques

// abre porta
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});