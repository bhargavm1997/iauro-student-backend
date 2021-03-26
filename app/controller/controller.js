var mongoose = require("mongoose")
const shortid = require("shortid")
const student = mongoose.model("student")
const validateInput = require("../lib/validation")
const response = require("../lib/lib")
const time = require('./../lib/timeLib');
const logger = require('./../lib/loggerLib');


let addStudent = (req, res) => {
    var a;
   
    a = new student({
        studentId: shortid.generate(),
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        mobileNumber:req.body.mobileNumber,
        createdOn: time.now()

    })
    a.save((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            let data = result.toObject()
            let apiresponse = response.generate(false, "success", 200, data)
            res.send(apiresponse)
        }
    })

}


let studentList = (req, res) => {
    student.find({}).select("-_v")
        .lean().exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'Failed To find student list', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All student Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}





let updateStudent = (req, res) => {
    student.findOneAndUpdate({ _id: req.query.id }, req.body, { multi: true }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error in updating student", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "student updated successfully", 200, result)
            res.send(apiResponse)
        }

    });

}





module.exports = {
    addStudent: addStudent,
    updateStudent: updateStudent,
    studentList:studentList
}