from dataclasses import dataclass


class HumanMessage:
    def __init__(self, content):
        self.role = "user"
        self.content = content

    def __getitem__(self, item):
        return getattr(self, item)

    def to_dict(self):
        return {"role": self.role, "content": self.content}


class AIMessage:
    def __init__(self, content):
        self.role = "assistant"
        self.content = content

    def __getitem__(self, item):
        return getattr(self, item)

    def to_dict(self):
        return {"role": self.role, "content": self.content}


class SystemMessage:
    def __init__(self, content):
        self.content = content
        self.role = "system"

    def __getitem__(self, item):
        return getattr(self, item)

    def to_dict(self):
        return {"role": self.role, "content": self.content}
