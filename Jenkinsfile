pipeline {
    agent any
    
    stages {
        stage("Code Cloning") {
            steps {
                git branch: 'main', url: 'https://github.com/DattaRahegaonkar/TWSThreeTierAppChallenge.git'
            }
        }
        
        stage("Build Image") {
            steps {
                sh 'docker build -t backend-of-3-tier-application-new ./Application-Code/backend'
                sh 'docker build -t frontend-of-3-tier-application-new ./Application-Code/frontend'
            }
        }
        
        stage("Pushing the Image on Docker Hub Repository") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "docker-hub-cred",
                    usernameVariable: "docker_hub_user",
                    passwordVariable: "docker_hub_password"
                    )]) {
                        sh "docker login -u ${docker_hub_user} -p ${docker_hub_password}"
                        sh "docker tag backend-of-3-tier-application-new ${docker_hub_user}/backend-of-3-tier-application-new"
                        sh "docker tag frontend-of-3-tier-application-new ${docker_hub_user}/frontend-of-3-tier-application-new"
                        sh "docker push ${docker_hub_user}/backend-of-3-tier-application-new"
                        sh "docker push ${docker_hub_user}/frontend-of-3-tier-application-new"
                    }
            }
        }
        
        stage("Deploying the Application") {
            steps {
                sh "docker-compose up -d"
            }
        }
    }
}
