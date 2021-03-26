var config = require("../appconfig/config")
var cont = require("../controller/controller")



module.exports.setRouter = (app) => {
    let baseurl = `${config.ver}`
    app.post(`${baseurl}/add`, cont.addStudent)
    app.get(`${baseurl}`, cont.studentList)
    app.put(`${baseurl}/edit`, cont.updateStudent)
    app.delete(`${baseurl}/delete`, cont.deleteStudent)
    app.get(`${baseurl}/get`, cont.getStudent)

}


