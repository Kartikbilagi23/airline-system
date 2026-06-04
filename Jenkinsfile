pipeline {
    agent any

    stages {

        stage('Environment Check') {
            steps {
                sh 'which node'
                sh 'which npm'
                sh 'node -v'
                sh 'npm -v'
                sh 'docker --version'
            }
        }
    }
}