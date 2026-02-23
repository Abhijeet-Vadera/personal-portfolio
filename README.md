
# Abhijeet Vadera – Portfolio Platform OS

Generated on: 2026-02-23T06:51:37.170533 UTC

## Overview
Multi-property cinematic portfolio platform with:

- Gateway (Storytelling Entry)
- Engineering Portfolio
- Photography Portfolio
- Admin Panel
- Serverless Backend (Lambda + API Gateway)
- Fallback Static JSON Strategy
- AWS S3 + CloudFront + Route53 Architecture

---

## Tech Stack

Frontend:
- React + TypeScript
- TailwindCSS
- Framer Motion
- GSAP
- Lenis
- Three.js (Hero Only)
- Lottie

Backend:
- AWS Lambda
- API Gateway
- Cognito (JWT Auth)
- S3 (Content + Images)

Infra:
- S3 (4 apps + content + images)
- CloudFront (4 distributions)
- Route53
- ACM (SSL)
- OAC enabled

---

## Single Command Setup (After Extracting)

1. Install dependencies:
   npm install

2. Start AI build workflow:
   npm run ai:build

This will trigger the structured AI execution plan step-by-step.

---

## Folder Structure

apps/
  gateway/
  engineering/
  photography/
  admin/

backend/
  lambda/
  schemas/

infrastructure/
  aws-setup-guide.md

ai/
  build-plan.md
  rules.md
  cursor.rules
  windsurf.rules
  antigravity.rules

---

## Deployment Strategy

Each app → Separate S3 bucket
Each bucket → CloudFront distribution
Mapped via Route53 subdomains:

- abhijeetvadera.com
- eng.abhijeetvadera.com
- photo.abhijeetvadera.com
- admin.abhijeetvadera.com

---

## Fallback Logic

Frontend attempts API first.
If API fails → Fetch static JSON from S3.

---

