default: push

IMAGE := ministryofjustice/local-scorecard
TAG := 1.1

push: .built-image
	docker tag $(IMAGE) $(IMAGE):$(TAG)
	docker push $(IMAGE):$(TAG)

.built-image: Dockerfile Makefile build-prod
	docker build -t $(IMAGE) .
	touch .built-image

build:
	bin/build.sh development

build-prod:
	bin/build.sh production

launch: build
	bin/launch.sh

clean:
	@if [ -d ".git" ]; then git clean -xdf --exclude ".idea"; fi
