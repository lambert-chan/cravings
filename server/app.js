let http = require('http');
let mysql = require('mysql');
let bcrypt = require('bcrypt'); 
const saltRounds = 10;
const { parse } = require('querystring');
const endpoint = "users/API/v1/";

const con = mysql.createConnection({
  host: "localhost",
  user: "vladkubl_cravingUser",
  password: "lea{s0v@YC8.",
  database: "vladkubl_craving",
});

con.connect(err => {
    if (err) throw err;
    console.log('Connected!');
});

http.createServer((req, res) => {
    var body = '';
    if (req.url !== '/favicon.ico') {
        
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        });
        
        if (req.method == 'GET' && req.url == '/users/API/v1/requests') {
            
            con.query(
                "SELECT count(id) as requests, endpoint, method FROM requests GROUP BY endpoint, method;",
                function (err, result, fields) {
                if (err) throw err;
                    res.end(JSON.stringify(result))
                })
        }
        
        if (req.method=='POST' && req.url == '/users/API/v1/users/login') {
            con.query(
                "INSERT INTO requests(method, endpoint) VALUES ('POST', 'API/v1/users/login')",
                function (err, result, fields) {
                if (err) throw err;
                })
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let user = parse(body);
                con.query(
                "SELECT id, password,is_admin FROM users WHERE email='" + user.email + "';",
                function (err, result, fields) {
                if (err) throw err;
                if (result.length === 0) {
                    res.end(JSON.stringify({response:"User not found!"}));
                }
                else {
                    res.end(JSON.stringify({id:result[0]["id"], is_admin:result[0]["is_admin"]}));
                }
                })
            })
        }
        
        
        if (req.method === "POST" && req.url === '/users/API/v1/users/register') {
            con.query(
                "INSERT INTO requests(endpoint, method) VALUES ('API/v1/users/register', 'POST')",
                function (err, result, fields) {
                if (err) throw err;
                    
                })
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let user = parse(body);
                
                con.query(
        "SELECT * FROM users where email='" + user.email + "';",
        function (err, result, fields) {
          if (err) throw err;
          if (result.length > 0) {
            res.end(JSON.stringify({response:"Email present"}));
          }
          else {
              bcrypt.hash(user.password, saltRounds, function(err, hash) {
            con.query(
                "INSERT INTO users(name, email, password) VALUES ('" +
                  user.name +
                  "','" +
                  user.email +
                  "','" +
                  hash +
                  "');",
                function (err, result, fields) {
                  if (err) throw err;
                  res.end(JSON.stringify(result));
                }
              );
              });
          }
        }
      );
            });
            
        }}
}).listen();