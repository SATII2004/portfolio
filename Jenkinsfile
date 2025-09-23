pipeline {
    agent any

    tools {
        // Ensure 'maven-3.9.6' and 'node-18' are configured in Jenkins > Manage Jenkins > Tools
        maven 'maven-3.9.6'
        nodejs 'node-18'
    }

    stages {
        stage('Checkout Code') {
    steps {
        echo 'Checking out code from Git...'
        // Explicitly define the branch as 'main'
        git branch: 'main', url: 'https://github.com/SATII2004/portfolio.git'
    }
}

        stage('Build Backend') {
            steps {
                echo 'Building the Spring Boot backend...'
                dir('portfolio-backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building the React frontend...'
                dir('portfolio') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images using Docker Compose...'
                sh 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying the application stack...'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
                echo 'Deployment complete! 🚀'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up the workspace.'
            cleanWs()
        }
    }
}