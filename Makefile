default: tag

IMAGE := ministryofjustice/local-scorecard
REPO := 754256621582.dkr.ecr.eu-west-2.amazonaws.com/central-digital-developers/courts-local-scorecard-dev-ecr
TAG := 1.2

tag: .built-image
	docker tag $(IMAGE) $(REPO):$(TAG)

push: tag
	docker push $(REPO):$(TAG)

.built-image: Dockerfile Makefile build-prod
	docker build -t $(IMAGE) .

build:
	bin/build.sh development

build-prod:
	bin/build.sh production

launch: build
	bin/launch.sh

clean:
	@if [ -d ".git" ]; then git clean -xdf --exclude ".idea"; fi
