Book Management System (MERN Stack) - Task 10 Optimization Report

Project Overview:"As part of Task 10, we first intentionally developed an unoptimized version of the app to simulate performance issues, and then improved its efficiency by identifying and fixing bottlenecks on both the frontend and backend."

Tech Stack: MongoDB, Express.js, React.js, Node.js (MERN)
Core Features:
   •Add/view/update/delete books
   •Search, filter, and pagination functionality
Development Approach:
   •First built unoptimized version to simulate performance issues
   •Then implemented optimization fixes

Backend (Server Side):
   •No MongoDB indexes → Slow searches
   •No pagination → Loading all books at once
   •No response compression → Heavy data transfer
   •Basic, unoptimized queries

Frontend (Client Side):
   •Loading all books data at once → Slow page load
   •No lazy loading for images
   •Excessive component re-renders
   •Missing memoization (no useMemo/useCallback/React.memo)

Optimization Improvements

Backend (Server Side):
   • Added MongoDB indexes (bookname, author) → Faster searches
   • Implemented pagination (limit + skip) → Reduced load
   • Optimized filtering/searching queries
   • Added response compression (compression middleware)

Frontend (Client Side)
   •Implemented lazy loading for images → Faster initial load
   •Reduced re-renders with:
	   •React.memo
	   •useMemo
	   •useCallback
   •Added pagination UI + search/filter components

Performance Metrics Comparison:

Before Optimization (Lighthouse Score: 69)
   • First Contentful Paint: 2.1s
   • Largest Contentful Paint: 3.6s
   • Speed Index: N/A (slow)
After Optimization (Lighthouse Score: 87)
   • First Contentful Paint: 1.0s (52% faster)
   • Largest Contentful Paint: 1.8s (50% faster)
   • Speed Index: 1.1s
Results Summary
   • Performance score improved by 18 points
   • Faster load times: 50-52% reduction
   • Smoother interactions
   • Reduced resource usage
   • Enhanced user experience
