const { exec, exit } = require('shelljs');
const Counter = require('./counter');

const maxTries = 2;

async function tryRestart() {
    await Counter.increase();
    const count = await Counter.count();
    if (count <= maxTries) {
        console.log();
        console.log(`Restarting service..., restart times is ${count}`);
        exec('npm run start', { async: true });
    } else {
        await Counter.reset();
        console.log();
        console.log('Max number of tries reached.');
        console.log('Reporting the issue to the developer...');
        // I don't know why it didn't exit from the current process after execute the below code.
        exit(1);
    }
}

tryRestart();
