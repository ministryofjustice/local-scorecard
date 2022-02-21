IMAGE := ministryofjustice/local-scorecard
TAG := 1.1

.built-image: Dockerfile makefile
	docker build -t $(IMAGE) .
	touch .built-image

push: .built-image
	docker tag $(IMAGE) $(IMAGE):$(TAG)
	docker push $(IMAGE):$(TAG)

build:
	bin/build.sh development

build-prod:
	bin/build.sh production

launch:
	bin/launch.sh
