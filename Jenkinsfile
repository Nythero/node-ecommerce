pipeline {
    agent none 
    stages {
        stage('build') {
	    agent {
		node { 
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
