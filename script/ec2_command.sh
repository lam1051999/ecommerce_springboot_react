#!/bin/bash
yum update -y

# Install Docker
amazon-linux-extras install docker -y
service docker start
systemctl enable docker
usermod -a -G docker ec2-user
chmod 666 /var/run/docker.sock

# Install Docker Compose
curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install git in your EC2 instance
yum install git -y

# Clone and run the application
cd ~
git clone https://github.com/lam1051999/ecommerce_springboot_react.git
cd ecommerce_springboot_react