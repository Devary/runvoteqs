def configuration = [vaultUrl: 'https://localhost:8200/',  vaultCredentialId: 'root', engineVersion: 2]


pipeline {
    agent any

    tools {
        maven 'Maven'
    }

	options {
		buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
	}

    environment {
        VERSION = readMavenPom().getVersion()
        NAME = readMavenPom().getArtifactId()
    }

    stages {
    
    	stage('scm') {
    	   steps {
	    	    checkout scm
    		}
    	}
        
        stage('compile') {
	        steps {
	       		withMaven() {           
           			sh 'mvn clean package -DskipTests'           			
           		}     
	        }        	                  
        }
        
         stage('tests') {
	        steps {
	       		withMaven() {           
           			sh 'mvn jacoco:prepare-agent test -P coverage'
           		}
           		
           		jacoco(
    				execPattern: '**/target/jacoco.exec',
    				classPattern: '**/target/classes/**',
    				sourcePattern: '**/src/main/java/**',
    				inclusionPattern: '**/*.class')
	        }        	                  
        }
        
        stage('sonar') {
        	steps {
        		withSonarQubeEnv('SonarQube') {
        			 sh 'mvn jacoco:report sonar:sonar -Dsonar.projectKey=runvoteqs -Dsonar.projectName=runvoteqs'
        		}
        	}
        }
        
        stage('package') {
            when {
                anyOf {
                    branch 'main'; branch 'dev'
                }
            }
            steps {
                script {
                    sh '''
						mkdir target/package/apps-repo
						cp target/$NAME-$VERSION.jar target/package/apps-repo/$NAME.jar
						cd target/package && zip -r ../$NAME-$VERSION.zip .
                    '''
                }
            }
        }

        stage('minio') {
            when {
                anyOf {
                    branch 'main'; branch 'dev'
                }
            }
            /* steps {
                minio bucket:'epvoteprsb',
                      credentialsId:'minio-epvoteprsb',
                      host:'https://cicd-automation-minio.secure.ep.parl.union.eu/',
                      includes:'target/$NAME-$VERSION.zip',
                      targetFolder:'$NAME'
            } */
        }

        stage ('Request deployment DEV') {
            /* steps {
                echo "Request deployment in DEV"
                withVault([configuration: configuration, vaultSecrets: rundeck_webhooks_dev]) {
                        script {
                            String url = " https://cicd-automation-rundeck.secure.ep.parl.union.eu/api/41/webhook/${rundeck_dev_token}#${rundeck_dev_name}"
                            String response = sh(script: "curl -X POST -H \"Content-Type: application/json\" -d '{\"version\":\"${VERSION}\",\"quarkus_app\":\"$NAME\"}' -s $url", returnStdout: true).trim()
                            echo response
                        }
                }
            } */
        }
        
    }
    
}


     
