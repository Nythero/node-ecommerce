pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
		script {
		    try {
		        bat 'echo Deleting node-test docker image'
		        bat 'docker rmi node-test'
		    }
		    catch (err) {
		        bat 'echo node-test docker image does not exist. Continuing with the process'
		    }
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
		MYSQLHOST = '172.20.0.21'
	    }
	    steps {
                bat "docker network create test --subnet=172.20.0.0/24"
		bat "docker run -d --rm --net test --ip ${MYSQLHOST} -e MYSQL_ROOT_PASSWORD=${MYSQLPASSWORD} -e MYSQL_DATABASE=${DATABASE} -p ${MYSQLPORT}:3306 --name mysql-test mysql"
		bat "docker run -d --rm --net test --ip 172.20.0.22 -p ${PORT}:${PORT} -e MYSQLHOST -e MYSQLPASSWORD -e MYSQLPORT -e DATABASE -e PORT -e MYSQLUSER -e MYSQLTIMEOUT -e MYSQLATTEMPTS --name node-test node-test"
            }
	}
    }
    post {
	always {
    	    bat 'docker stop mysql-test'
            bat 'docker stop node-test' 
            bat 'docker rmi node-test'
	    bat 'docker network rm test'
        }
    }
}
