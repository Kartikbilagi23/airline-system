pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Code checked out'
            }
        }

        stage('Node Version') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Docker Version') {
            steps {
                sh 'docker --version'
            }
        }
    }
}