pipeline {
    agent any

    stages {
        stage('Debug PATH') {
            steps {
                sh 'echo $PATH'
                sh 'which node || true'
                sh 'which npm || true'
                sh 'node -v || true'
                sh 'npm -v || true'
            }
        }
    }
}