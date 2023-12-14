import os
from pathlib import Path
from modal import Image, Secret, Stub, method, gpu

CURR_DIR = str(Path(__file__).parent.resolve())

REPO_ID = "elinas/chronos-13b-v2"

def download_model():
    from huggingface_hub import snapshot_download

    # Read More Dummy 
    # https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/_snapshot_download.py#L26
    snapshot_download(
        repo_id=REPO_ID,
    )


image = (
    Image
    .debian_slim()
    .pip_install(
        "transformers>=4.32.0", 
        "huggingface", 
        "huggingface_hub", 
        "hf-transfer",
    )
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(
        download_model,
        timeout=60 * 20,
    )
)

stub = Stub("roleplay-inference", image=image)


@stub.cls(
    gpu=gpu.A10G(),
    container_idle_timeout=240,
)
class LLM:
    def __enter__(self):
        import torch
        from transformers import AutoTokenizer, AutoModelForCausalLM

        self.tokenizer = AutoTokenizer.from_pretrained(REPO_ID)
        self.model = AutoModelForCausalLM.from_pretrained(REPO_ID)

    @method()
    def generate(self, prompt: str):
        inputs = self.tokenizer(
            prompt=prompt,
            return_tensors="pt"
        )
        outputs = self.model.generate(**inputs)
        result = self.tokenizer.decode(outputs[0])
        return result

if __name__ == '__main__':
    llm = LLM()

    output = llm.generate("Once upon a time, there was a")

    print(output)
    