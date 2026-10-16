# 07. External APIs & data manipulation

## 🎯 Objective
Apply OpenCode to real integration tasks: consume REST APIs, handle errors, and process data — with the agent writing, running, and explaining the code.

## 📋 Consuming an API with code

Ask OpenCode to write and test the call directly in your project. Study example in [`exemplos/api_exemplo.py`](../../modulo-02-intermediario/exemplos/api_exemplo.py):

```python
import requests

def fetch_data(url, token=None):
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
```

Best practices:
- **Always set a timeout** + `try/except` for network errors
- Validate `status_code` before parsing
- Keep API keys in environment variables — never in code
- Limit the output: use `opencode run --format json` for pipelines

## 📋 Data manipulation

See [`exemplos/dados_exemplo.py`](../../modulo-02-intermediario/exemplos/dados_exemplo.py) — builds a formatted JSON report from a list of grades:

```python
import json
from datetime import datetime

students = json.loads(raw_data)
report = {
    "total_students": len(students),
    "overall_average": sum(s["grade"] for s in students) / len(students),
    "highest": max(students, key=lambda x: x["grade"]),
}
print(json.dumps(report, indent=2, ensure_ascii=False))
```

### With OpenCode in the flow

```bash
# run and explain the script
opencode run --file exemplos/dados_exemplo.py "Run and explain the generated report"

# structured output for data pipelines
opencode run --format json --file data.json "Summarize this dataset in 3 metrics"
```

## 🧠 Prompt tips for data

- Pass the file with `--file` or `@file` instead of pasting the content
- Ask for the **output format** explicitly (JSON, table, CSV)
- For large inputs, ask for paging/incremental analysis (`read` pages by lines)

## ❓ Hands-on challenge

1. Ask OpenCode: "create a function that fetches the first 10 posts from https://jsonplaceholder.typicode.com and prints each title"
2. Add error handling and a timeout, then test with an invalid URL
3. Ask to extend `dados_exemplo.py` with the median and the best student by average
4. Produce the output with `--format json` and parse it with `jq`

## 📚 Official source

- [CLI — run](https://opencode.ai/v2/docs/cli/commands/) · [Tools](https://opencode.ai/v2/docs/tools/)

---

**Next step:** [Module 03 — Advanced](../../modulo-03-avancado/README.md) 🇧🇷 · [Back to module](README.md)