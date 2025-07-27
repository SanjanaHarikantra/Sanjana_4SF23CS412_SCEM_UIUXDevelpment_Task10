UI/UX Development:Task10
This is a Book Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. The app lets users add, view, update, delete, search, filter, and paginate book data."As part of Task 10, we first intentionally developed an unoptimized version of the app to simulate performance issues, and then improved its efficiency by identifying and fixing bottlenecks on both the frontend and backend."

Performance Bottlenecks (Before Optimization)

Backend(Server Side):
No indexes in MongoDB, so searches were slow.
No pagination, which meant loading all books at once.
No response compression, which made data transfer heavy.
Queries were basic and not optimized.

Frontend(Client-side):
All books data were loaded at once — slow page load.
No lazy loading for images.
Components re-rendered too many times.
No memoization techniques like useMemo, useCallback, or React.memo.

What We Improved in the Optimized Version:

Backend(Server Side):
Added indexes to bookname and author for faster searches.
Implemented pagination (limit and skip) to reduce load time.
Used query optimization techniques for filtering and searching.
Added response compression using the compression middleware.

Frontend(Client-side):
Used lazy loading for images to speed up initial load time.
Reduced unnecessary re-renders using React.memo, useMemo, and useCallback.
Implemented pagination UI, along with search and filter.

Initially, the Lighthouse performance score was 69, with high First Contentful Paint (2.1s) and Largest Contentful Paint (3.6s), indicating that the page was rendering slowly.
After applying these changes, the performance score improved to 87, with significantly better loading metrics:
First Contentful Paint: 1.0s
Largest Contentful Paint: 1.8s
Speed Index: 1.1s
This optimization makes the app faster, smoother, and more efficient, especially on initial load.
After optimization, the application became significantly faster and smoother. The performance score improved by 18 points, with faster load and interaction times. These enhancements contribute to a better user experience and reduced resource usage.



