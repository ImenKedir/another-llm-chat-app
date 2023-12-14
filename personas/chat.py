from typing import TypedDict, Generator
 
import replicate
from utils import set_up_env

# Set up environment variables
set_up_env()

MODELS = { 
	"min7b": "mistralai/mistral-7b-v0.1:3e8a0fb6d7812ce30701ba597e5080689bef8a013e5c6a724fafb108cc2426a0",
    # Model Details: https://huggingface.co/mistralai/Mistral-7B-v0.1

    "min7b-instruct": "mistralai/mistral-7b-instruct-v0.1:83b6a56e7c828e667f21fd596c338fd4f0039b46bcfa18d973e8e70e455fda70",
    # Model Details: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1

	"zep7b": "tomasmcm/zephyr-7b-beta:961cd6665b811d0c43c0b9488b6dfa85ff5c7bfb875e93b4533e4c7f96c7c526",
    # Model Details: https://huggingface.co/HuggingFaceH4/zephyr-7b-beta 

	"dol12b": "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
    # Model Labs: https://huggingface.co/databricks/dolly-v2-12b 
}

class ReplicateLLM():
    def __init__(self, model_name: str):
        self.model_name = model_name 
        self.model_address = MODELS[model_name]
    
    def __call__(self, prompt: str) -> Generator[str, None, None]:
        return self.run(prompt)
    
    def run(self, prompt: str) -> Generator[str, None, None]:
        for token in replicate.run(
            ref = self.model_address,
            input = {
                "top_k": 3,
                # size of sampling pool for next token
                "prompt": prompt,
                "temperature": 0.9,
                "max_new_tokens": 256,
                "presence_penalty": 1,
            }
        ):
            yield token

class Message(TypedDict):
    role: str 
    content: str


class ZephyrMemory():
    def __init__(self, memory: list[Message] = []):
        self.memory = memory
    
    def add_message(self, message: Message):
        self.memory.append(message)
    
    def get_last_k_messages(self, k: int) -> list[Message]:
        output = ""
        for message in self.memory[:k]:
            output += f"<|{message['role']}|>"
            output += "\n"
            output += f"{message['content']}"
            output += "\n"
        return output
    
    def dump(self) -> str:
        output = ""
        for message in self.memory:
            output += f"<|{message['role']}|>"
            output += "\n"
            output += f"{message['content']}"
            output += "\n"
        return output


class ZephyrRolePlayLLM():
    def __init__(
            self, 
            llm: ReplicateLLM, 
            memory: ZephyrMemory,
    ):
        self.llm = llm
        self.memory = memory

    def run(self, user_prompt: str, debug: bool = False):
        from prompts import zephyr_base_prompt, zephyr_system_prompt

        # Usig last k messages as memory
        memory_prompt = self.memory.get_last_k_messages(k=7)
        zephyr_prompt = zephyr_base_prompt.format(
            system_prompt=zephyr_system_prompt,
            user_prompt=user_prompt,
            memory_prompt=memory_prompt,
        )

        if debug:
            print("====================================")
            print(zephyr_prompt)
            print("====================================")
        else:
            # generate the response
            output = []
            last_token = ""
            for token in self.llm(prompt=zephyr_prompt):
                if token == "\n" and last_token == "\n":
                    break
                print(token, end="")
                output.append(token)
                last_token = token
            ai_response = "".join(output)

            # remember the conversation
            self.memory.add_message({
                "role": "user",
                "content": user_prompt,
            })
            self.memory.add_message({
                "role": "assistant",
                "content": ai_response,
            })



def zephyr_chat():
    zephyr_llm = ReplicateLLM(model_name="zep7b")
    zephyr_roleplay = ZephyrRolePlayLLM(
        llm=zephyr_llm,
        memory=ZephyrMemory(),
    )

    def dump_memory():
        print("====================================")
        print("Memory Dump:")
        print(zephyr_roleplay.memory.dump())
        print("====================================")
    
    def debug():
        zephyr_roleplay.run(user_prompt="debug", debug=True)
        
    user_input = input("User: ")
    while user_input != "exit":
        if user_input == "dump":
            dump_memory()
        elif user_input.startswith("debug "):
            debug()
        else:
            print("====================================")
            print("Zephyr: ")
            zephyr_roleplay.run(user_prompt=user_input) 
            print("\n====================================")

        user_input = input("User: ")

if __name__ == '__main__':
    zephyr_chat()