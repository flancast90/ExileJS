/*
 * Copyright 2021 Finn Lancaster
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
*/

/*
 * dependencies are all native, and are declared here for easy reference. In case they 
 * are not already installed, the user can just `npm install [dependency]`
*/
const readline = require('readline');
const fs = require('fs');

/*
 * here we retrieve the users who are banned, and keep them as an array
 * for this session.
*/

// global variable (all lonely and sad)
var blacklist = fs.readFileSync('blacklist.txt', 'utf8').split('\n')

/*
 * Initialise code for module. Our library will accept the arguments:
 * exile.check(userid, callback), exile.ban(userid), exile.unban(userid)
*/
module.exports = {
    /*
     * start exile.check function, taking userid as param. We will simply check and
     * see if the userid existed in the blacklist.txt file, and if so, we return 
     * that they are banned.
    */
    check: function(userid) {
        if (blacklist.includes(userid)){
            return "banned";
        }else{
            return;
        }
    },

    /*
     * start exile.ban function. Here we will use the userid to check if the id is already
     * banned, and if so return an error.
    */
    ban: function(userid) {
        if (blacklist.includes(userid)) {
            console.log("\n\x1b[31m[Errno01]: Invalid userId '"+userid+"'. \n\x1b[33m User is already blacklisted. For more information, see https://github.com/flancast90/exilejs.");
        }else {
            /* 
             * If the user is not already banned, we will add there id to the file of
             * other banned ids.
            */
            fs.appendFile("blacklist.txt",userid+"\n", (err) => {
                /*
                 * This should never catch anything if the user has installed correctly,
                 * but it is best practice to check to avoid messy errors. Basically, 
                 * the file must exist before we can write to it.
                */
                if (err) {
                    console.log("\n\x1b[31m[Errno02]: File 'blacklist.txt' not found in directory. For more information, see https://github.com/flancast90/exilejs.");
                }else{
                    /*
                     * We just need to make sure the user knows that the user has been 
                     * successfully banned.
                    */
                    console.log("\n\x1b[32m UserId '"+userid+"' successfully banned.");
                }
            });
        }
    },

    /*
     * The exile.unban funtion will simply remove the users id from the blacklist.txt file,
     * thus "unbanning" them.
    */
    unban: function(userid) {
        /*
         * error message in case the user is not already banned, since someone banned cannot
         * be unbanned. By giving them the link to github, maybe they will star :)
        */
        if (blacklist.indexOf(userid) == -1) {
            console.log("\n\x1b[31m[Errno03]: UserId '"+userid+"' is not a correct value or is not currently banned. See https://github.com/flancast90/exilejs for more information.");
        } else {
            /*
             * remove the userid completely from the file. Although we technically do not
             * need the RegExp expression, it is best to make sure there is only
             * one instance of the userid in the file, just in case a user tried to
             * experiment without the checks the program has.
            */
            var data = fs.readFileSync('blacklist.txt', 'utf-8');

            var newContent = data.replace(new RegExp(userid+"\n"), '');
            fs.writeFileSync('blacklist.txt', newContent, 'utf-8');

            /*
             * again, we just let the user know everything has successfully completed.
            */
            console.log("\n\x1b[32m UserId '"+userid+"' successfully unbanned.");
        }
    }
}

