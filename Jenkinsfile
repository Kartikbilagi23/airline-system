pipeline {
    agent any

    stages {
        stage('Debug') {
            steps {
                sh 'which node'
                sh 'which npm'
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}