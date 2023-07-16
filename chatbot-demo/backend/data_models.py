from pydantic import BaseModel


class HumanMessage(BaseModel):
    role: str = "user"
    content: str

    def __getitem__(self, item):
        return getattr(self, item)

    def __dict__(self):
        return vars(self)


class AIMessage(BaseModel):
    role: str = "assistant"
    content: str

    def __getitem__(self, item):
        return getattr(self, item)

    def __dict__(self):
        return vars(self)


class SystemMessage(BaseModel):
    role: str = "system"
    content: str

    def __getitem__(self, item):
        return getattr(self, item)

    def __dict__(self):
        return vars(self)
