pipeline {
    agent none 
    stages {
        stage('build') {
	     agent node-agent
	     sh npm install
	     npm test
        }
}
