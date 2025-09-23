pipeline {
    agent any

    tools {
        // Ensure 'MAVEN' and 'NODE_JS' are configured in Jenkins > Manage Jenkins > Tools
        maven 'MAVEN'
        nodejs 'NODE_JS'
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
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building the React frontend...'
                dir('portfolio') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images using Docker Compose...'
                bat 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying the application stack...'
                bat 'docker-compose down -v'
                bat 'docker-compose up -d'
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
