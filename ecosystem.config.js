module.exports = {
    apps: [{
        script: "dist/index.js",
        // interpreter_args: " -r ./tsconfig-paths-bootstrap.js",
        name: "glints-test-backend",
        // watch: '.'
    }, ],

    // deploy : {
    //   production : {
    //     user : 'SSH_USERNAME',
    //     host : 'SSH_HOSTMACHINE',
    //     ref  : 'origin/master',
    //     repo : 'GIT_REPOSITORY',
    //     path : 'DESTINATION_PATH',
    //     'pre-deploy-local': '',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    //     'pre-setup': ''
    //   }
    // }
};