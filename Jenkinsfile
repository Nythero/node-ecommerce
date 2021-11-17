pipeline {
    agent none 
    stages {
        stage('build') {
	    agent {
		docker { 
		    image 'node-agent'
		}
	    }
	    steps{
		sh npm install
		npm test
	    }
        }
    }
}
