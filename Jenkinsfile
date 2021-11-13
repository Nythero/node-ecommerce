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
		MYSQLPASSWORD = 123456	
		MYSQLPORT = 5000
		DATABASE = 'test'
		PORT = 3000
		MYSQLUSER = 'root'
		MYSQLTIMEOUT = 5000
		MYSQLATTEMPTS = 3
	    }
	    steps {
	    	bat 'npm test'
		bat "docker run -d --rm -e MYSQL_ROOT_PASSWORD=${MYSQLPASSWORD} -e MYSQL_DATABASE=${DATABASE} -p ${MYSQLPORT}:3306 --name mysql-test mysql"
		bat 'npm run server'
            }
	}
    }
    post {
	always {
    	    bat 'docker stop mysql-test'
        }
    }
}
