pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
		npm install
            }
        }
	stage('test') {
	    steps {
	    	bat 'npm test'
            }
	}
    }
}
