pipeline {
 agent { label "build" }
 environment {
        def ip = sh returnStdout: true, script: 'curl -s http://169.254.169.254/latest/meta-data/public-ipv4'
 }
    stages {
      stage("checkout"){
        steps {
         checkout scm
        }
      }
  
      stage("Launch service"){
        steps {
          sh "sudo docker-compose stop" 
          sh "sudo docker-compose up -d"
          sh "sudo docker-compose logs"  
        }
      }
    
      stage("Launch Info") {
        steps {
          echo "http://${ip}"
        }
      }

      stage("Protractor testing"){
        steps {
          dir ("./test") {
              sh "sudo docker-compose up -d"
              sh "sudo docker build -t protractor ."
              sh "sudo docker rm -f protractor"
              //sh "sudo rm -rf ./protractorTest/conf/allure-results/*.xml"
              sh "sudo docker run -v /home/ubuntu/workspace/Ethereum-DevOps-Demo/test/conf/allure-results:/test/conf/allure-results -e ETH_APP_URL=$ETH_APP_URL --name protractor protractor"
          }
        }
      }  
    }
 post {
   always {
     dir ( "./test/conf/" ) { 
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
     }
   }  
  }
}
 
