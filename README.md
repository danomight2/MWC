# Mid-West Corvettes homepage prototype

A responsive homepage concept for Mid-West Corvettes, Inc. Built in the MWC project using React, Vinext, and CSS.

## Local development

Use Node.js 22 LTS. Run `npm ci`, then `npm run dev`.

## GitHub Pages

Repository: https://github.com/danomight2/MWC

Website: https://danomight2.github.io/MWC/

Push changes to `main` to build and publish automatically. Progress and failures appear in the repository's **Actions** tab under **Publish website**. You can also launch this workflow manually.

`npm run build:pages` generates and checks the static site in `dist/client`. The build uses `/MWC` for asset URLs. Set `PAGES_BASE_PATH` to an empty string if later publishing at a custom domain root, or to another repository path if renaming the repository.

The existing private Sites preview remains a separate deployment. `npm run build` retains its original Worker build; pushing to GitHub updates GitHub Pages only.

## Prototype scope

The homepage includes club information, event highlights, membership information, and links to the current club website and photo albums. Event highlights are a static September 5, 2026 snapshot, not a synchronized feed. Member login, the full calendar, applications, contact, and albums use existing services.

Before a full launch, confirm meeting details and membership requirements with the club, choose the authoritative calendar, and connect homepage events to that source.

## Club assets

Assets were sourced from the club's existing public website for this requested redesign. No ownership transfer or third-party license is implied.

- Logo: https://mwcorvettes.s3.us-east-2.amazonaws.com/2022/05/mwc-logo-100.png
- Aerial club photograph: https://mwcorvettes.s3.us-east-2.amazonaws.com/2025/07/thumbnail_DJI_0385-Center-del-edit-2.jpg
- 50th anniversary photograph: https://mwcorvettes.com/wp-content/uploads/2015/02/mwc-50-anniversary-1280x790.jpg

## Content sources

- https://mwcorvettes.com/
- https://mwcorvettes.com/membership/
- https://mwcorvettes.com/club-events/

Public homepage content only; no member records, authentication, or private data have been copied.
