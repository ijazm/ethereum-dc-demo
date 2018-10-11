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
         echo "http://${ip}:"
         
           }
       }
    }
}  
