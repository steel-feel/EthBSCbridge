const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

//check if nonce is not there
// if(!(db.get("nonce").value())){
   db.default({ "nonce" : 1 });
// }


exports.db = db;