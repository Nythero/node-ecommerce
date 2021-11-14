pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
		try {
		    bat 'echo Deleting node-test docker image'
		    bat 'docker rmi node-test'
		}
		catch (err) {
		    bat 'echo node-test docker image does not exist. Continuing with the process'
		}
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
		bat "docker run -d --rm --name node-test node-test -p ${PORT}:${PORT}"
            }
	}
    }
    post {
	always {
    	    bat 'docker stop mysql-test'
            bat 'docker stop node-test' 
            bat 'docker rmi node-test'
        }
    }
}
