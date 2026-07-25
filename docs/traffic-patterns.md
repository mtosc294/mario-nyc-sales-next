# Traffic and conversion patterns used in this prototype

This project does not clone any third-party website. It adapts recurring product patterns found across high-traffic real-estate portals and major NYC brokerages.

## Patterns adopted

1. Search-first homepage
   - Buy, sell and invest tabs.
   - Address, neighborhood, building or property-type intent.
   - A useful result even before a listing feed exists.

2. Clear audience routing
   - Separate seller, buyer and investor pages.
   - Different forms, questions, scoring and calls to action.

3. Programmatic neighborhood architecture
   - Static pages generated from structured neighborhood data.
   - Each page includes a direct answer, local questions and a relevant conversion path.

4. Editorial content hub
   - Direct answers at the top.
   - NYC-specific steps and limitations.
   - Visible update date and Article structured data.

5. Seller utility
   - Human-reviewed valuation positioning.
   - Explains factors rather than making an unsupported automated-value claim.

6. Lead pipeline integration
   - Server-side route validates the minimum required fields.
   - Deterministic scoring assigns stage and recommended next action.
   - The scoring logic is inspectable and does not use protected-class information.

## Patterns intentionally not copied

- Brand marks, visual assets, page copy or proprietary listing presentation.
- Automated valuation claims without sufficient source data.
- Listing inventory or market statistics presented as live when they are placeholders.
- Dark patterns, forced registration or hidden referral relationships.
