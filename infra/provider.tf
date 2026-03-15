terraform {
  required_version = ">=1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # This is optional but HIGHLY recommended for the future
  # backend "s3" {
  #   bucket = "glimr-terraform-state"
  #   key    = "state/terraform.tfstate"
  #   region = "ap-south-1"
  # }
}

provider "aws" {
  region = "ap-south-1"

  default_tags {
    tags = {
      Project   = "Glimr"
      ManagedBy = "Terraform"
      Owner     = "Shibasis Roy"
    }
  }
}
