resource "aws_ecr_repository" "glimr_server" {
  name                 = "glimr-server"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_apprunner_service" "glimr_service" {
  service_name = "glimr-chat-service"
  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_service_role.arn
    }
    image_repository {
      image_identifier      = "${aws_ecr_repository.glimr_server.repository_url}:latest"
      image_repository_type = "ECR"
      image_configuration {
        port = "3001"
      }
    }
    auto_deployments_enabled = true
  }

  instance_configuration {
    cpu    = "0.25 vCPU"
    memory = "0.5 GB"
  }
}

resource "aws_iam_role" "apprunner_service_role" {
  name = "apprunner-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        # This is the specific principal for App Runner to talk to ECR
        Service = "build.apprunner.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "apprunner_ecr_access" {
  role       = aws_iam_role.apprunner_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

output "app_runner_url" {
  value = aws_apprunner_service.glimr_service.service_url
}
