IMAGE_REPO := 289609572201.dkr.ecr.us-east-1.amazonaws.com/prod/labs-antifraud-process-engine
IMAGE_TAG := latest
PACKAGE_VER ?= 0.0.2-SNAPSHOT

.PHONY: build up down shell deploy docker-build docker-push aws-ecr

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

shell:
	docker-compose run camunda /bin/bash

docker-build:
	docker build -t $(IMAGE_REPO):$(IMAGE_TAG) --build-arg PACKAGE_VER=$(PACKAGE_VER) .
	docker tag $(IMAGE_REPO):$(IMAGE_TAG) $(IMAGE_REPO):$(IMAGE_TAG)

docker-push:
	docker push $(IMAGE_REPO):$(IMAGE_TAG)

aws-ecr:
	$(shell aws ecr get-login --no-include-email)

deploy: aws-ecr docker-build docker-push 
	helm dep update helm/antifraud
	helm dep build helm/antifraud
	helm upgrade --install antifraud-bpmns helm/antifraud --force --recreate-pods
