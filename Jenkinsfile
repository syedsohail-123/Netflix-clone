pipeline {
    agent any

    environment {
        IMAGE_NAME = "syedsohail746/netflix"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "netflix-clone-container"
        GIT_REPO = "https://github.com/syedsohail-123/Netflix-clone.git"
        GIT_BRANCH = "main"
    }

    stages {
        stage('Checkout') {
            steps {
                dir('Netflix-clone') {
                    git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    env.VERSION_TAG = "${env.BUILD_NUMBER}"
                    sh """
                        docker build -f Dockerfile \
                        --cache-from ${IMAGE_NAME}:${IMAGE_TAG} \
                        -t ${IMAGE_NAME}:${IMAGE_TAG} \
                        -t ${IMAGE_NAME}:${VERSION_TAG} .
                    """
                }
            }
        }

        stage('Scan Docker Image with Trivy') {
            steps {
                sh "trivy image --exit-code 1 --severity CRITICAL,HIGH ${IMAGE_NAME}:${IMAGE_TAG} || true"
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_NAME}:${VERSION_TAG}"
                }
            }
        }

        stage('Run Container for Preview (Optional)') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 8080:86 ${IMAGE_NAME}:${IMAGE_TAG}"
                    echo "Container running at http://<JENKINS_HOST>:8080"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            sh "docker stop ${CONTAINER_NAME} || true"
            sh "docker rm ${CONTAINER_NAME} || true"
        }
    }
}









