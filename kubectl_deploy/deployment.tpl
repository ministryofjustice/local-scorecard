apiVersion: apps/v1
kind: Deployment
metadata:
  name: crown-court-local-scorecard
spec:
  replicas: 1  
  selector:
    matchLabels:
      app: crown-court-local-scorecard
  template:
    metadata:
      labels:
        app: crown-court-local-scorecard
    spec:
      containers:
      - name: local-scorecard
        image: ${ECR_URL}:${IMAGE_TAG}
        ports:
        - containerPort: 8080
