### ExileJS: Example Usage
The code provided is intended as a demo for the ExileJS library. To test, simply download the repo, ``cd`` into the ``example`` folder, and then launch the demo with ``node example.js``.


The demo will be launched at ``localhost:8081``, which will send your fingerprint to the console, and ``ExileJS`` will check to see if it is banned. 

### Banning your fingerprint (the easy way)
navigate to the ``blacklist.txt`` file, and add the browser fingerprint that was output earlier to the top of the list. Save the file, exit, and then refresh the localhost page, and you should get a "403 Forbidden" error and a "you are banned" message!
