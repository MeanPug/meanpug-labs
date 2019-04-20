IMAGE_REPO := 289609572201.dkr.ecr.us-east-1.amazonaws.com/prod/labs-antifraud-worker
IMAGE_TAG := latest
IMAGE_NAME := test/antifraud-worker

.PHONY: build up down shell docker-build docker-tag docker-push aws-login deploy

build:
	docker build -t $(IMAGE_NAME) .

up:
	docker run -v $(PWD)/src:/code/src --network antifraud_dev-net --env-file .env --rm -itd $(IMAGE_NAME)

down:
	$(eval RUNNING=$(shell docker ps -aqf "ancestor=$(IMAGE_NAME)"))
	for proc in $(RUNNING) ; do docker stop $$proc ; done

shell:
	docker run -v $(PWD)/src:/code/src --network antifraud_dev-net --env-file .env --entrypoint "/bin/sh" -it $(IMAGE_NAME) --rm

tag:
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) $(IMAGE_REPO):$(IMAGE_TAG)

push:
	docker push $(IMAGE_REPO):$(IMAGE_TAG)

aws-login:
	$(shell aws ecr get-login --no-include-email)

deploy: aws-login build tag push
	helm upgrade --install antifraud-worker helm/worker -f helm/prod-values.yaml --force --recreate-pods
