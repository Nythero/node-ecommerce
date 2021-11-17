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
    			node {
    			    label 'mysql-agent'
    			}
    		    }
		    steps {}
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
