@Library("jenkins-shared-library") _
pipeline {
    agent any

    parameters {
        booleanParam(name: 'dockerBuild', defaultValue: true, description: 'Build Docker Image?')
        booleanParam(name: 'dockerhubPush', defaultValue: true, description: 'Push Image to DockerHub?')
        booleanParam(name: 'deploy', defaultValue: true, description: 'Deploy?')
    }

    environment {
        IMAGE_NAME = 'tutopediafrontend'
        IMAGE_VERSION = 'latest'

        DOCKERHUB_DOMAIN = "ruwel123"
        DOCKERHUB_CREDENTIALS = credentials('DockerHubServiceConnection')
    }

    stages {
        stage("Tut-O-Pedia_Docker_Frontend: DOCKER IMAGE BUILD") {
            when {
                expression {
                    params.dockerBuild
                }
            }
            steps {
                sh 'docker build . -t $DOCKERHUB_DOMAIN/$IMAGE_NAME:$IMAGE_VERSION'
            }
        }

        stage("Tut-O-Pedia_Docker_Backend: PUSH TO DOCKERHUB") {
            when {
                expression {
                    params.dockerhubPush
                }
            }
            steps {
                sh '''
                  docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                  docker push $DOCKERHUB_DOMAIN/$IMAGE_NAME:$IMAGE_VERSION
                '''
            }
        }

        stage("Tut-O-Pedia_Docker_Backend: DEPLOY") {
            when {
                expression {
                    params.deploy
                }
            }
            steps {
                echo "DEPLOYING..."
                build 'Tut-O-Pedia_Docker_Deploy'
            }
        }
    }

    post {
        always {
            mailTo(to: "rwdevops123@gmail.com", attachLog: true)
        }
    }
}