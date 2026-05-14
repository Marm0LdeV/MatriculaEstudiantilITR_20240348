import app from "./app.js";
import "./database.js";

async function main () {
    app.lister (4000);
    console.log ("Server on port 4000");
}

main ();