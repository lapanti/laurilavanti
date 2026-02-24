[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti)[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti)

# Homepage of Lauri Lavanti

This is the repository containing the code for my homepage https://laurilavanti.fi, which I use mainly for my political hobby. At the same time this repository works as a proof-of-concept for different technical things (such as maintaining a 100% test coverage and a high pagespeed score) as well as a place for me to test the latest and greatest technologies frontend development has to offer.

## Technologies

The site is built with Astro, TypeScript, and modern web standards. Actual content is hosted on Contentful and the site is hosted on Cloudflare Pages. Quality is checked with Vitest, ESLint, Prettier, Playwright, GitHub Actions, and SonarCloud.

## Development

To develop, first you need a `.env.development`-file with the keys `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_TOKEN`. If you want to use preview (draft content), you also need to set `CONTENTFUL_PREVIEW_TOKEN`.

After that, you can run the following commands:

- `npm run dev` - Start the development server
- `npm run build` - Build the site for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint the code
- `npm run check` - Check TypeScript types

## Deployment and quality checks

Everything is automated using GitHub Actions:

1. **Build**: Creates a production build of the site
2. **Lint**: Checks code style with ESLint and Prettier
3. **TypeCheck**: Verifies TypeScript types
4. **Knip**: Finds unused files, dependencies, and exports
5. **Unit Tests**: Runs Vitest unit tests with coverage
6. **SonarCloud**: Performs static code analysis
7. **Deploy**: Deploys to Cloudflare Pages
8. **E2E Tests**: Runs Playwright tests against the deployed site

The pipeline runs on every push to main branch and on pull requests.
