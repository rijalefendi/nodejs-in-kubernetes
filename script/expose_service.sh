#!/bin/bash
kubectl expose deployment nodejs-deployment --target-port=3002 --name=nodejs-service --type=NodePort