packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0a2304f95171f7d0c"
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for WebApp"
  ami_users       = ["995720948536", "315818784251"]
  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  # launch_block_device_mappings {
  #   delete_on_termination = true
  #   device_name           = "/dev/sda1"
  #   volume_size           = 8
  #   volume_type           = "gp2"
  # }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "../webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "config.json"
    destination = "/tmp/config.json"
  }

  provisioner "file" {
    source      = "app_startup.service"
    destination = "/tmp/app_startup.service"
  }

  provisioner "shell" {
    inline = ["sudo mv /tmp/webapp.zip /opt/webapp.zip"]
  }

  provisioner "shell" {
    inline = ["sudo mv /tmp/config.json /opt/config.json"]
  }

  provisioner "shell" {
    inline = ["sudo mv /tmp/app_startup.service /opt/app_startup.service"]
  }

  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]
    script = "init_setup.sh"
  }

}
