pipeline {
	agent none
	environment {
		MYSQLUSER = 'node'
		MYSQLPASSWORD = 123456
		MYSQLTIMEOUT = 5000
		MYSQLATTEMPTS = 3
		MYSQLPORT = 3306
		PORT = 3000
		MYSQL_DATABASE = 'test'
 		DATABASE = 'test'
	}
	stages {
		stage('Build') {
			agent {
				node {
					label 'mysql-agent'
				}
			}
			options {
				skipDefaultCheckout true
			}
			stages {
	            		stage('Get node-agent IP') {
			                agent {
	        				node {
				                        label 'node-agent'
	                			}
			                }
	                		steps {
	                    			script {
	                        			env.NODEIP = sh([script: 'hostname -I', returnStdout: true]).trim()
	                        			sh "echo ${env.NODEIP}"
	                    			}
	                		}
	            		}
				stage('Setup MySQL') {
					steps {    
					        sh 'useradd sql'
						sh 'chown -R sql /var/lib/mysql'
						sh 'mysqld --user=sql --initialize-insecure'
						sh "echo \"CREATE DATABASE ${MYSQL_DATABASE};\" >> initfile"
						sh "echo \"CREATE USER ${MYSQLUSER}@${env.NODEIP} IDENTIFIED BY '${MYSQLPASSWORD}';\" >> initfile"
						sh "echo \"GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO \"${MYSQLUSER}\"@\"${env.NODEIP}\";\" >> initfile"
						sh 'nohup mysqld --user=sql --init-file=/workspace/ecommerce_jenkinsDocker/initfile &'
						script {
				                	env.MYSQLHOST = sh([script: 'hostname -I', returnStdout: true]).trim()
					            	sh "echo mysql-agent running at ${env.MYSQLHOST}"
					        }
			            	}
				}
				stage('Setup Node') {
	        	    		agent {
	        	        		node {
	        	            			label 'node-agent'
	        	        		}
	        	    		}
	        	    		stages {
	        	    			stage('Start Server') {    
	        	    		        	steps {
	        	        		        	sh 'hostname -I'
					            	        sh 'npm install'
					            	        sh 'nohup npm run server &'
	        		    		        }
	        		   		}
	        	    			stage('Integration Test') {
	        	    				agent {
	        	    					node {
									label 'node-agent'
								}
							}
							steps {
								sh 'npm install -g newman'
								sh "newman run tests/Eccomerce.postman_collection.json --env-var \"PORT=${PORT}\" --env-var \"HOST=${env.NODEIP}\""
							}
						}
					}
				}
			}
		}
	}
}
