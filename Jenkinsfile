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
		step {
		    sh npm install
		}
		npm test
	    }
        }
    }
}
