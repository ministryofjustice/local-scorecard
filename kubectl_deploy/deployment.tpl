apiVersion: apps/v1
kind: Deployment
metadata:
  name: courts-local-scorecard-dev
spec:
  replicas: 1  
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
