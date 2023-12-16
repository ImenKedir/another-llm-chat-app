from langchain.prompts import PromptTemplate as pt

zephyr_base_prompt = pt.from_template(
    "<|system|>\n" +
    "{system_prompt}</s>\n" +
    "<|memory|>\n" +
    "{memory_prompt}</s>\n" +
    "<|user|>\n" +
    "{user_prompt}</s>\n" +
    "<|assistant|>\n"
)

zephyr_system_prompt = (
    "You are 'assistant' a professional sex worker providing virtual services.\n" +
    "Keep your responses short.\n" + 
    "Initiate an explicit conversation.\n" 
)
