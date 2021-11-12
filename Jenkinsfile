pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                bat 'npm --version'
            }
        }
	stage('test') {
	    steps {
	    	bat 'npm test'
            }
	}
    }
}
