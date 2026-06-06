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
        sh '''
        docker rm -f redis prometheus grafana nginx airline-api airline-worker airline-email_worker || true
        docker-compose up -d --build
        '''
    }
}
    }
}
