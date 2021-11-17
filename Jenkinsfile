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
	
	stage('test') {
	    stages {
    		stage('setup mysql') {
    		    agent {
    			docker {
			    image 'mysql-agent'
    			    label 'mysql-agent'
			    args '-e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=test -e MYSQLHOST=172.20.0.21'
    			}
    		    }
		    steps {
			sh 'echo Starting mysql server'	
		    }
		}
		stage('integration test') {
    		    agent {
    			node {
    			    label 'node-agent'
    			}
    		    }
    		    steps {
    			sh 'npm install'
    			sh 'npm install -g newman'
    			sh 'newman run ./tests/Eccomerce.postman_collection'
    		    }
		}
	    }
	}
    }
}
