pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
		bat 'docker build . -t node-test'
		bat 'docker pull mysql'
		bat 'npm test'
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
		bat "docker run -d --rm -e MYSQL_ROOT_PASSWORD=${MYSQLPASSWORD} -e MYSQL_DATABASE=${DATABASE} -p ${MYSQLPORT}:3306 --name mysql-test mysql"
		bat "docker run -d --rm --name node-test node-test"
            }
	}
    }
    post {
	always {
    	    bat 'docker stop mysql-test'
            bat 'docker stop node-test'
        }
    }
}
