# vehicle-ad-extractor
This project aims to extract standardized, structured data from vehicle advertisement text using TypeScript and OpenAI, with schema validation, quality evaluation, and cost and latency tracking.

## Expected behavior

The API will accept vehicle advertisement text or a vehicle search prompt and return standardized data according to the [response contract](docs/contract.md) and [extraction rules](docs/rules.md). These rules allow confident model-to-brand inference, numeric normalization, and price, mileage, and year ranges. Missing or unresolved ambiguous information must be returned as `null`; other unsupported facts must not be invented.

Currently, the project provides a minimal API endpoint to verify that the server is running. Advertisement extraction is not implemented yet.

## Development

```bash
npm install
npm run dev
```

The API is available at `http://localhost:3000`. Send a `GET /` request to verify that the server is running:

```bash
curl http://localhost:3000
```

Use `PORT=3001 npm run dev` to change the port and `npm run typecheck` to check TypeScript types.
