pipeline {
    agent none 
    stages {
        stage('build') {
	    agent {
		docker { 
		    image 'node-agent'
		}
	    }
	    sh npm install
	    npm test
        }
}
