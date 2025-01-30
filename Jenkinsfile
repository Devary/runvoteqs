pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    //environment {
    //    VERSION = readMavenPom().getVersion()
    //    NAME = readMavenPom().getArtifactId()
    //}

    stages {
    
    	stage('scm') {
    	   steps {
	    	    checkout scm
    		}
    	}
        
        stage('compile') {
	        steps {
	       		bat 'mvn clean package -DskipTests'
	        }        	                  
        }
        
         stage('tests') {
	        steps {

           		bat 'mvn jacoco:prepare-agent test -P coverage'
           		
           		jacoco(
    				execPattern: '**/target/jacoco.exec',
    				classPattern: '**/target/classes/**',
    				sourcePattern: '**/src/main/java/**',
    				inclusionPattern: '**/*.class')
	        }        	                  
        }
        
    stage('SonarQube Analysis') {
        steps {
        withSonarQubeEnv("sonar") {
                    bat "mvn clean verify sonar:sonar -Dsonar.projectKey=runvoteqs -Dsonar.projectName='runvoteqs'"
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
                    bat '''
						mkdir target/package/apps-repo
						cp target/$NAME-$VERSION.jar target/package/apps-repo/$NAME.jar
						cd target/package && zip -r ../$NAME-$VERSION.zip .
                    '''
                }
            }
        }
        
    }
    
}