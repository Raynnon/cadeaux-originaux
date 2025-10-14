const { exec } = require("child_process");

const execCmd = (cmd, rejectMsg, resolveMsg) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(rejectMsg);
      }

      resolve(resolveMsg);
    });
  });
};

const dumpDB = async (user, password, host, dbName) => {
  const cmd = `mongodump --uri mongodb+srv://${user}:${password}@${host}${dbName} --out ./database/backup/`;

  await execCmd(cmd, "Failed to dump DB", "DB dumped");
};

const restoreDB = async (user, password, host, dbName) => {
  const cmd = `mongorestore --uri mongodb+srv://${user}:${password}@${host}${dbName} ./database/backup/cadeauxoriginaux`;

  await execCmd(cmd, "Failed to restore DB", "DB Restored");
};

module.exports = { execCmd, dumpDB, restoreDB };
