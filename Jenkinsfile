pipeline {
    agent none 
    stages {
        stage('build') {
	    agent {
		docker { 
		    label 'node-agent'
		}
	    }
	    steps{
		sh 'npm install'
		sh 'npm test'
	    }
        }
    }
}
