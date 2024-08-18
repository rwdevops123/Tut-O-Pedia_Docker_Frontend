pipeline {
    agent any

    stages {
        stage("Tut-O-Pedia_Docker_Frontend: Init") {
            steps {
                echo "[Tut-O-Pedia_Docker_Frontend]: INIT"
            }
        }
        stage("after-publish") {
            steps {
                echo "[Tut-O-Pedia_Docker_Frontend]: Build Database"
                build 'Tut-O-Pedia_Docker_Database'
            }
        }
    }
}