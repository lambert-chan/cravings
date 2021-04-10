let http = require('http');
let mysql = require('mysql');
let bcrypt = require('bcrypt'); 
var url = require('url');
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
            "Access-Control-Allow-Methods": "*",
        });
        
        if (req.method == 'GET' && req.url == '/users/API/v1/requests') {
            
            con.query(
                "SELECT count(id) as requests, endpoint, method FROM requests GROUP BY endpoint, method;",
                function (err, result, fields) {
                if (err) throw err;
                    res.end(JSON.stringify(result));
                });
        }
        
        if (req.method=='POST' && req.url == '/users/API/v1/users/login') {
            con.query(
                "INSERT INTO requests(method, endpoint) VALUES ('POST', 'API/v1/users/login')",
                function (err, result, fields) {
                if (err) throw err;
                });
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
                    bcrypt.compare(user.password, result[0]['password']).then(function(results) {
                            if (results) {
                                res.end(JSON.stringify({id:result[0]["id"], is_admin:result[0]["is_admin"]}));
                            }
                            else {
                                res.end(JSON.stringify({response:"Passwords do not match!"}));
                            }
                        });
                    
                }
                });
            });
        }
        
        
        if (req.method === "POST" && req.url === '/users/API/v1/users/register') {
            con.query(
                "INSERT INTO requests(endpoint, method) VALUES ('API/v1/users/register', 'POST')",
                function (err, result, fields) {
                if (err) throw err;
                    
                });
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
                              res.end(JSON.stringify({response:"Registered"}));
                            }
                        );
                        });
                      }
                    }
                  );
            });
        }
        
        if (req.method == "PUT" && req.url == '/users/API/v1/users') {
        con.query(
            "INSERT INTO requests(endpoint, method) VALUES ('API/v1/users', 'PUT')",
            function (err, result, fields) {
            if (err) throw err;});
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let user = parse(body);
                con.query(
                    "SELECT * FROM users where email='" + user.email + "' AND users.id!=" + user.id + ";",
                    function (err, result, fields) {
                        if (err) throw err;
                        if (result.length > 0) {
                            res.end(JSON.stringify({response:"Email present"}));
                        }
                        else {
                        let query1 = "UPDATE users SET name='" + user.name + "', email='" + user.email + "' WHERE users.id=" + user.id + ";";
                        con.query(
                            query1,
                            (error, results, field) => {
                              if (error) throw error;
                              if (results.affectedRows == 1) {
                                res.end(JSON.stringify({response: "Updated"}));
                
                              }
                            }
                        );
                        }
            }
            )})}}
            
        if (req.method == "DELETE" && req.url == '/users/API/v1/users') {
          con.query(
            "INSERT INTO requests(endpoint, method) VALUES ('API/v1/users', 'DELETE')",
            function (err, result, fields) {
            if (err) throw err;}); 
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let user = parse(body);
                con.query(
                    "SELECT * FROM users WHERE users.id=" + user.id + ";",
                    function (err, result, fields) {
                        if (err) throw err;
                        if (result.length === 0) {
                            res.end(JSON.stringify({response:"User not found"}));
                        }
                        else {
                            con.query(
                            "DELETE FROM users WHERE users.id=" + user.id + ";",
                            function (error, results, field) {
                                if (error) throw error;
                                if (results.affectedRows == 1) {
                                    res.end(JSON.stringify({response:"Deleted"}));
                                }
                            }
                            );
                        }
                    }
                    );
        })}
        if (req.method == 'GET') {
            let urlParsed = url.parse(req.url, true);
            if (urlParsed.pathname == '/users/API/v1/lists/getByUser') {
                con.query(
                "INSERT INTO requests(endpoint, method) VALUES ('API/v1/lists/getByUser', 'GET')",
                function (err, result, fields) {
                if (err) throw err;}); 
                let user = urlParsed.query;
                con.query(
                    "SELECT * FROM users WHERE users.id=" + user.id + ";",
                    function (err,result, field) {
                        if (err) throw err;
                        if (result.length === 0) {
                            res.end(JSON.stringify({response:"User not found"}));
                        }
                        else {
                            let query = "SELECT lists.id, lists.name, lists.description, lists.is_private, GROUP_CONCAT(DISTINCT(tag_name)) AS tags, GROUP_CONCAT(DISTINCT(restaurant_name)) AS restaurants FROM users LEFT JOIN lists ON users.id = lists.owner_id LEFT JOIN list_tags ON lists.id = list_tags.list_id LEFT JOIN list_restaurants ON lists.id = list_restaurants.list_id WHERE users.id =" + user.id + " GROUP BY lists.id;";
                            con.query(
                                query,
                                function (err, result, fields) {
                                    if (err) throw err;
                                    res.end(JSON.stringify({response: result}));
                                }
                            );
                        }
                    }
                    );
                
            }
        }
        
        if (req.method == 'GET') {
            let urlParsed = url.parse(req.url, true);
            if (urlParsed.pathname == '/users/API/v1/lists/getAll') {
                con.query(
                "INSERT INTO requests(endpoint, method) VALUES ('API/v1/lists/getAll', 'GET')",
                function (err, result, fields) {
                if (err) throw err;});
                let query = "SELECT lists.name, lists.description, GROUP_CONCAT(DISTINCT(tag_name)) AS tags, GROUP_CONCAT(DISTINCT(restaurant_name)) AS restaurants FROM users LEFT JOIN lists ON users.id = lists.owner_id LEFT JOIN list_tags ON lists.id = list_tags.list_id LEFT JOIN list_restaurants ON lists.id = list_restaurants.list_id WHERE lists.is_private = 0 GROUP BY lists.id;";
                con.query(
                    query,
                    function (err, result, fields) {
                        if (err) throw err;
                        res.end(JSON.stringify({response: result}));
                    }
                );
            }
            
        }
            
        
        if (req.method == 'POST' && req.url == '/users/API/v1/lists') {
            con.query(
            "INSERT INTO requests(endpoint, method) VALUES ('API/v1/lists', 'POST')",
            function (err, result, fields) {
            if (err) throw err;}); 
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let user = parse(body);
                let list = JSON.parse(user.list);
                con.query(
                    "INSERT INTO lists(name, owner_id, description, is_private) VALUES ('"+ list.name +"'," + user.id + ",'" + list.description + "'," + list.is_private + ");",
                    );
                con.query('SELECT LAST_INSERT_ID()', 
                function(err,result,fields){
                    if (err) throw err;
                    let lst_id = result[0]["LAST_INSERT_ID()"];
                    if (list.tags.length != 0) {
                        let query = "INSERT INTO list_tags(list_id, tag_name) VALUES (";
                        for (let i=0; i < list.tags.length; i++) {
                            if (i != list.tags.length - 1) { 
                                query = query + lst_id +",'" + list.tags[i] + "'),(";
                            }
                            else {
                                query = query + lst_id +",'" + list.tags[i] + "');"
                            }
                        }
                        con.query(query);
                    }
                    if (list.restaurants.length != 0) {
                        let query = "INSERT INTO list_restaurants(list_id, restaurant_name) VALUES (";
                        for (let i=0; i < list.restaurants.length; i++) {
                            if (i != list.restaurants.length - 1) { 
                                query = query + lst_id +",'" + list.restaurants[i] + "'),(";
                            }
                            else {
                                query = query + lst_id +",'" + list.restaurants[i] + "');"
                            }
                        }
                        // res.end(JSON.stringify({response: query}));
                        con.query(query);
                    }
                    res.end("Inserted!");
                });
                
        })
        }
        
        if (req.method == "PUT" && req.url == '/users/API/v1/lists') {
            con.query(
            "INSERT INTO requests(endpoint, method) VALUES ('API/v1/lists', 'PUT')",
            function (err, result, fields) {
            if (err) throw err;});
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let data = parse(body);
                let list = JSON.parse(data.list);
                let reqTags = list.tags;
                let reqRestaurants = list.restaraunts;
                let query = "SELECT * FROM lists WHERE lists.id=" + data.id + ";";
                con.query(query, function(err,result,fields) {
                    if (err) throw err;
                    if (result.length == 0) {
                        res.end(JSON.stringify({"response": "List not found"}));
                    }
                    else {
                        let query = "UPDATE lists SET name='" + list.name + "',  description='" + list.description + "', is_private=" + list.is_private + " WHERE lists.id =" + data.id + ";";
                        con.query(query, function (err, result, fields) {
                            if (err) throw err;
                            if (result.affectedRows == 1) {
                                let query = "SELECT lists.id, lists.name, lists.description, lists.is_private, GROUP_CONCAT(DISTINCT(tag_name)) AS tags, GROUP_CONCAT(DISTINCT(restaurant_name)) AS restaurants FROM lists LEFT JOIN list_tags ON lists.id = list_tags.list_id LEFT JOIN list_restaurants ON lists.id = list_restaurants.list_id WHERE lists.id =" + data.id + ";"
                                con.query(query, function(err,result,fields) {
                                    if (err) throw err;
                                    let tags = result[0].tags.split(",")
                                    let restaurants = result[0].restaurants.split(",");
                                    let deletedTags = [];
                                    let deletedRestaurants = [];
                                    let insertedRestaurants = [];
                                    let insertedTags = [];
                                    tags.forEach((tag) => {
                                        if (!reqTags.includes(tag)) {
                                            deletedTags.push(tag)
                                        }
                                    });
                                    reqTags.forEach((tag) => {
                                        if (!tags.includes(tag)) {
                                            insertedTags.push(tag)
                                        }
                                    })
                                    restaurants.forEach((restaurant) => {
                                        if (!reqRestaurants.includes(restaurant)) {
                                            deletedRestaurants.push(restaurant)
                                        }
                                    });
                                    reqRestaurants.forEach((restaurant) => {
                                        if (!restaurants.includes(restaurant)) {
                                            insertedRestaurants.push(restaurant)
                                        }
                                    })
                                    
                                    deletedTags.forEach((tag) => {
                                        let query = "DELETE FROM list_tags WHERE list_id=" + data.id + " AND tag_name='" + tag + "';"
                                        con.query(query, (err, result, fields) => {
                                            if (err) throw err;
                                        })
                                    })
                                    if (insertedTags.length > 0) {
                                        let query = "INSERT INTO list_tags(list_id, tag_name) VALUES ";
                                        for (let i = 0; i< insertedTags.length; i++) {
                                            if (i != insertedTags.length - 1) { 
                                                query = query + "(" + data.id + ",'"+ insertedTags[i] + "'), "
                                            }
                                            else {
                                                query = query + "(" + data.id + ",'"+ insertedTags[i] + "');"
                                            }
                                        }
                                        con.query(query);
                                    }
                                    deletedRestaurants.forEach((restaurant) => {
                                        let query = "DELETE from list_restaurants WHERE list_id=" + data.id + " AND restaurant_name='" + restaurant +"';"
                                        con.query(query, (err, result, fields) => {
                                            if (err) throw err;
                                        })
                                    });
                                    if (insertedRestaurants.length > 0) {
                                        let query = "INSERT INTO list_restaurants(list_id, restaurant_name) VALUES ";
                                        for (let i = 0; i< insertedRestaurants.length; i++) {
                                            if (i != insertedRestaurants.length - 1) { 
                                                query = query + "(" + data.id + ",'"+ insertedRestaurants[i] + "'), "
                                            }
                                            else {
                                                query = query + "(" + data.id + ",'"+ insertedRestaurants[i] + "');"
                                            }
                                        }
                                        con.query(query);
                                    }
                                    })
                                    
                                }
                                res.end(JSON.stringify({response: "Updated"}));
                                })
                            }
                        })
            })
        }
        if (req.method == "DELETE" && req.url == '/users/API/v1/lists') {
          con.query(
            "INSERT INTO requests(endpoint, method) VALUES ('API/v1/lists', 'DELETE')",
            function (err, result, fields) {
            if (err) throw err;}); 
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let list = parse(body);
                let query = "SELECT GROUP_CONCAT(DISTINCT(list_tags.id)) AS tag_ids, GROUP_CONCAT(DISTINCT(list_restaurants.id)) AS restaurant_ids FROM lists LEFT JOIN list_tags ON lists.id = list_tags.list_id LEFT JOIN list_restaurants ON lists.id = list_restaurants.list_id WHERE lists.id=" + list.id + " GROUP BY lists.id;"
                con.query(
                    query, function (err, result, fields) {
                        if (err) throw err;
                        if (result[0].tag_ids) {
                            let deletedTags = result[0].tag_ids.split(",");
                            deletedTags.forEach((tag_id) => {
                                let id = parseInt(tag_id);
                                let query = "DELETE FROM list_tags WHERE id=" + id + ";";
                                con.query(query, (err, result, fields) => {
                                    if (err) throw err;
                                })
                            })
                        }
                        if (result[0].restaurant_ids) {
                            let deletedRests = result[0].restaurant_ids.split(",");
                            deletedRests.forEach((rest_id) => {
                                let id = parseInt(rest_id);
                                let query = "DELETE from list_restaurants WHERE id=" + id + ";";
                                con.query(query, (err, result, fields) => {
                                    if (err) throw err;
                                })
                            })
                        }
                        let query = "DELETE FROM lists WHERE id=" + list.id +";";
                        con.query(query, (err,result, fields) => {
                            if (err) throw err;
                            res.end(JSON.stringify({response: "Deleted"}));
                        });
                    }
                    )
            });
        }
    
}).listen();
