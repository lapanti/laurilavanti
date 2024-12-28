[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti)[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lapanti_laurilavanti&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lapanti_laurilavanti)

# Homepage of Lauri Lavanti

This is the repository containing the code for my homepage https://laurilavanti.fi, which I use mainly for my political hobby. At the same time this repository works as a proof-of-concept for different technical things (such as maintaining a 100% test coverage and a high pagespeed score on a React app) as well as a place for me to test the latest and greatest technologies frontend development has to offer.

## Technologies

The site is built with Gatsby, React and Typescript. Actual content is hosted on Contentful and the site is hosted on Cloudflare. Quality is checked with Jest, Eslint, Prettier, Playwright, Github Actions and SonarQube.

## Development

To develop, first you need a `.env.development`-file with the keys `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`. If you want to use preview (draft content), you also need to set `CONTENTFUL_HOST` to `preview.contentful.com`.

After that, you can just run `npm run develop` to start the app.

## Deployment and quality checks

Everything is automated using github actions 😊
