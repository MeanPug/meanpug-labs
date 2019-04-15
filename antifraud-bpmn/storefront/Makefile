IMAGE_REPO := 289609572201.dkr.ecr.us-east-1.amazonaws.com/prod/labs-antifraud-storefront
IMAGE_TAG := latest

.PHONY: build up down

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

docker-build:
	docker build -t $(IMAGE_REPO):$(IMAGE_TAG) -f docker/app/Dockerfile .

docker-tag:
	docker tag $(IMAGE_REPO):$(IMAGE_TAG) $(IMAGE_REPO):$(IMAGE_TAG)

docker-push:
	docker push $(IMAGE_REPO):$(IMAGE_TAG)

aws-login:
	$(shell aws ecr get-login --no-include-email)

deploy: aws-login docker-build docker-tag docker-push
	helm upgrade --install antifraud-storefront helm/storefront -f helm/prod-values.yaml
