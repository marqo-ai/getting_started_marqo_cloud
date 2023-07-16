import re


def remove_responses(text: str) -> str:
    # Regular expression pattern
    pattern = r"\`\`\`curl\sBackend Function Call[\s\S]+\}\"\s\`\`\`"

    # Replace the matching substring with empty string
    new_str = re.sub(pattern, "", text)
    return new_str
