# Vehicle advertisement extraction contract

The extractor accepts vehicle advertisement text or a vehicle search prompt and returns one JSON object containing all 13 fields below. Every field is required, including fields whose value is `null`. Field names use English camelCase.

Apply the [extraction rules](rules.md), including model-to-brand inference, numeric normalization, range extraction, and selection of the last mentioned vehicle. Otherwise, missing or unresolved ambiguous information must be JSON `null`, never the string `"null"`, an empty string, or an invented value.

## Fields

| Field | Expected format | When to use `null` |
|---|---|---|
| `brand` | Vehicle manufacturer. A string explicitly stated or confidently inferred from the selected model, such as `Fiat` for `Uno`. | No explicit brand or confident model-to-brand mapping is available. |
| `model` | Selected vehicle model. A string; use the last mentioned vehicle when multiple vehicles appear. | No model can be identified confidently. |
| `yearMin` | Lower year bound. A four-digit integer; use the smaller of two years or repeat a single year in both bounds. | No supported lower bound is available. |
| `yearMax` | Upper year bound. A four-digit integer; use the larger of two years or repeat a single year in both bounds. | No supported upper bound is available. |
| `priceMin` | Lower price bound. A non-negative JSON number in Brazilian reais. A single exact price fills both bounds. | No supported lower price bound is available. |
| `priceMax` | Upper price bound. A non-negative JSON number in Brazilian reais. A single exact price fills both bounds. | No supported upper price bound is available. |
| `kmMin` | Lower odometer bound. A non-negative integer in kilometers. A single exact reading fills both bounds. | No supported lower mileage bound is available. |
| `kmMax` | Upper odometer bound. A non-negative integer in kilometers. A single exact reading fills both bounds. | No supported upper mileage bound is available. |
| `fuelType` | Vehicle fuel type or energy source, explicitly stated as a string. | Absent, ambiguous, or conflicting. Do not infer it from the model. |
| `transmission` | Vehicle transmission type, explicitly stated as a string. | Absent, ambiguous, or conflicting. Do not infer it from the model. |
| `color` | Vehicle exterior color, explicitly stated as a string. | Absent, ambiguous, or conflicting. An interior color alone is insufficient. |
| `city` | Vehicle location or requested city, explicitly stated as a string. | Absent, ambiguous, or conflicting. Do not infer it from telephone area codes. |
| `state` | Brazilian state, represented by its two-letter uppercase UF abbreviation. An explicitly stated full state name may be normalized. | Absent, ambiguous, or invalid. Do not infer it from the city. |

When both bounds are available, the minimum must not exceed the maximum. Unsupported fields remain `null` independently of supported fields.

The previous `price`, `mileage`, `manufacturingYear`, and `modelYear` fields are replaced by the corresponding bounds and must not appear in the response.

## Complete response example

Input: `corolla entre 50 e 100 mil de 2015 a 2018`

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "yearMin": 2015,
  "yearMax": 2018,
  "priceMin": 50000,
  "priceMax": 100000,
  "kmMin": null,
  "kmMax": null,
  "fuelType": null,
  "transmission": null,
  "color": null,
  "city": null,
  "state": null
}
```

All fields appear in this response; only supported values are non-null. If no information can be extracted, return the same keys with every value set to `null`.
