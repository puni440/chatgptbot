import json
import random
import os
import re
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INTENTS_FILE = os.path.join(BASE_DIR, "intents.json")

with open(INTENTS_FILE, "r", encoding="utf-8") as f:
    raw_intents = json.load(f)["intents"]

INTENT_GROUPS = defaultdict(lambda: {"patterns": [], "responses": []})

for intent in raw_intents:
    base_tag = intent["tag"].split("_")[0]
    INTENT_GROUPS[base_tag]["patterns"].extend(intent["patterns"])
    INTENT_GROUPS[base_tag]["responses"].extend(intent["responses"])


def normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text.strip()


def get_bot_response(user_message: str) -> str:
    user_tokens = set(normalize(user_message).split())

    GENERIC_TAGS = {"confirmation"}
    FALLBACK_TAG = "fallback"

    best_tag = None
    best_score = 0.0

    for tag, data in INTENT_GROUPS.items():
        if tag in GENERIC_TAGS or tag == FALLBACK_TAG:
            continue

        for pattern in data["patterns"]:
            pattern_tokens = set(normalize(pattern).split())
            if not pattern_tokens:
                continue

            common_words = user_tokens & pattern_tokens
            match_percent = (len(common_words) / len(pattern_tokens)) * 100

            if match_percent > best_score:
                best_score = match_percent
                best_tag = tag

    if best_tag and best_score >= 60:
        return random.choice(INTENT_GROUPS[best_tag]["responses"])

    if len(user_tokens) <= 3:
        for tag in GENERIC_TAGS:
            for pattern in INTENT_GROUPS[tag]["patterns"]:
                if normalize(pattern) == normalize(user_message):
                    return random.choice(INTENT_GROUPS[tag]["responses"])

    return random.choice(INTENT_GROUPS[FALLBACK_TAG]["responses"])
