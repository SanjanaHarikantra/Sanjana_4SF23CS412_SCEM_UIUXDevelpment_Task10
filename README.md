
# Book Management System (MERN Stack) – Task 10 Optimization Report

## Project Overview

As part of Task 10, we first intentionally developed an unoptimized version of the app to simulate performance issues. Then, we improved its efficiency by identifying and fixing bottlenecks on both the frontend and backend.

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS

## Core Features

- Add / View / Update / Delete books
- Search functionality
- Filter functionality
- Pagination

## Development Approach

- First, an unoptimized version was built to simulate and observe performance issues.
- Then, optimizations were implemented on both the backend and frontend to enhance performance and efficiency.

## Identified Issues

### Backend (Server Side)

- No MongoDB indexes → Slow searches
- No pagination → All books loaded at once
- No response compression → Large payloads
- Basic, unoptimized queries

### Frontend (Client Side)

- All book data loaded at once → Slow page load
- No lazy loading for images
- Excessive component re-renders
- Missing memoization (useMemo, useCallback, React.memo)

## Optimization Improvements

### Backend

- Added MongoDB indexes on bookname and author
- Implemented pagination using limit and skip
- Optimized search/filter queries
- Added response compression using compression middleware

### Frontend

- Implemented lazy loading for images
- Reduced re-renders using:
  - React.memo
  - useMemo
  - useCallback
- Added pagination UI and search/filter components

## Performance Metrics Comparison

### Before Optimization (Lighthouse Score: 69)

- First Contentful Paint (FCP): 2.1s
- Largest Contentful Paint (LCP): 3.6s
- Speed Index: 2.1s

### After Optimization (Lighthouse Score: 87)

- First Contentful Paint (FCP): 1.0s (52% faster)
- Largest Contentful Paint (LCP): 1.8s (50% faster)
- Speed Index: 1.1s

## Results Summary

- Performance score improved by 18 points
- Faster load times: 50–52% reduction
- Smoother interactions
- Reduced resource usage
- Enhanced user experience

## Screenshots


