import childProcess from 'child_process';

const args = process.argv.slice(2);
const dev = args[0] || '';

// TODO
const imageName = 'carbon-platform';
const imageTag = '0.0.6' + dev;

function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    const commandProcess = childProcess.exec(cmd, (err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    });
    commandProcess.stdout.pipe(process.stdout);
  });
}

async function build() {
  const cmd = 'pnpm build';
  await execCommand(cmd);
  await execCommand(`docker build -t hub.deri.org.cn/mgec/v3/web/${imageName}:${imageTag} .`);
  await execCommand(`docker push hub.deri.org.cn/mgec/v3/web/${imageName}:${imageTag}`);
}

build();
