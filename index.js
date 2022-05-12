// tem alguns logs mas foi para testar no momento, nao tem necessidade

//nesse eu uso mysql2
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
  host: "sql10.freesqldatabase.com",
  port: "3306",
  user: "sql10491724",
  password: "ihaLKXwlkv",
  database: "sql10491724"
});

// toppage
app.post("/toppage", (req, res) => {
  const hora = req.body.hora;
  const data = req.body.data;

  con.query("update top set hora=?, data=? where id=1", [hora, data], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("dados inseridos toppage");
      console.log(hora);
      console.log(data);
      return res.send(result);
    }
  });
});

app.get("/pushtoppage", function (req, res) {
  con.query("select * from top", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("dados requisitados toppage");
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
      console.log("dados inseridos promo");
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
      console.log("dados requisitados promo");
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
      console.log("dados apagados promo");
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
      console.log("dados inseridos destaques");
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
      console.log("dados requisitados destaques");
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
      console.log("dados apagados destaques");
      res.send(result);
    }
  });
});
// destaques

// abre porta
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});