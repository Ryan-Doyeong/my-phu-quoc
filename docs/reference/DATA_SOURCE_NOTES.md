# Launch directory source notes

The launch database contains 40 Food & Dining and 40 Health & Wellness sample rows sourced from current public Phu Quoc Google Maps-derived directory/search results using a 4.0+ source filter. A few older test rows remain, so the production table currently contains 43 published Food rows and 43 published Wellness rows.

These records are intentionally marked:
- `source_label = Google Maps 4.0+ sample import`
- `verification_status = ai_checked`

They are not represented as final Good life Verified businesses. Before public launch, use an approved Google Places API key to refresh place identity, current rating/review count, address, phone, opening hours and permitted photo references, then complete human editorial review.

Google/third-party imagery must be displayed and attributed in accordance with the applicable provider terms. The seed package uses generic locally bundled category images rather than copying third-party business photos into the project.
