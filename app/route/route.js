var express = require("express")
var config = require("../appconfig/config")
var cont = require("../controller/controller")



module.exports.setRouter = (app) => {
    let baseurl = `${config.ver}`
    app.post(`${baseurl}/add`, cont.addStudent)
    app.get(`${baseurl}`, cont.studentList)
    app.put(`${baseurl}/edit`, cont.updateStudent)
 
}


