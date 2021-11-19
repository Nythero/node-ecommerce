pipeline {
	agent none 
	stages {
		stage('Setup MySQL') {
			agent {
				node {
					label 'mysql-agent'
				}
			}
			options {
				skipDefaultCheckout true
			}
			stages {
				stage('Integration Testing') {
					agent {
						node {
							label 'node-agent'
						}
					}
					steps {
						echo 'Hola Node'
					}
				}
			}
		}
	}
}
