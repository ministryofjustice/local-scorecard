apiVersion: apps/v1
kind: Deployment
metadata:
  name: courts-local-scorecard-dev
spec:
  replicas: 2
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 100%
  selector:
    matchLabels:
      app: courts-local-scorecard-dev
  template:
    metadata:
      labels:
        app: courts-local-scorecard-dev
    spec:
      containers:
      - name: local-scorecard
        image: ${ECR_URL}:${IMAGE_TAG}
        ports:
        - containerPort: 8080