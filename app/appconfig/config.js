let a={}
a.port=process.env.port || 3000;
a.allowedCorseOrigin="*"
a.apiver="/student"
a.db={
    uri:"mongodb://127.0.0.1:27017/student"
}
a.env="dev"



module.exports={
    port:a.port,
    allowedCorseOrigin:a.allowedCorseOrigin,
    ver:a.apiver,
    db:a.db,
    env:a.env
}