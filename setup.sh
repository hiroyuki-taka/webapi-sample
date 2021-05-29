#!/usr/bin/env bash

BUCKET_NAME=fullmarks-study-sample-20210521

aws s3 mb s3://$BUCKET_NAME/
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://setup/bucket-policy.json
