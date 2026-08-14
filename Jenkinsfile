pipeline {
    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
    }

    stages {
        stage('Verify Java') {
            steps {
                sh 'java -version'
            }
        }

        stage('Verify Maven') {
            steps {
                sh 'mvn -version'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
    }
}
