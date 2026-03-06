# SpringMart Frontend

Frontend for the SpringMart showcase project.

## Scripts

- `npm start`: run the frontend locally.
- `npm test -- --watchAll=false`: run the current unit tests once.
- `npm run build`: create a production build.

## Structure

- `src/features/products`: product pages, API helpers, and shared product form logic.
- `src/shared`: shared UI components and toast helpers.
- `src/components/home`: landing page sections.
- `src/pages`: shared top-level pages such as Home and NotFound.

## Notes

- Styling is handled with Sass modules plus shared global Sass.
- Backend integration is unchanged and still targets the existing Spring Boot API.
