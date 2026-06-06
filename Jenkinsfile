pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}