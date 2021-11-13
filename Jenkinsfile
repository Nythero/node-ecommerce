pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
		bat 'npm install'
		bat 'docker pull mysql'
            }
        }
	stage('test') {
	    environment {
	  	PORT = 5000
		MYSQLPASSWORD = 123456	
		DATABASE = 'test'
	    }
	    steps {
	    	bat 'npm test'
		bat 'docker run -d --rm -e MYSQL_ROOT_PASSWORD=${MYSQLPASSWORD} -e MYSQL_DATABASE=${DATABASE} -p PORT:3306 --name mysql-test mysql'
		bat 'npm server'
            }
	}
    }
}
