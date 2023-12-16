from pathlib import Path
from modal import Image, Secret, Stub, web_endpoint, method, gpu

CURR_DIR = str(Path(__file__).parent.resolve())

REPO_ID = "Austism/chronos-hermes-13b-v2"

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
        "transformers", 
        "huggingface", 
        "huggingface_hub", 
        "hf-transfer",
        "torch",
        "accelerate",
    )
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(
        download_model,
        timeout=60 * 20,
    )
)

stub = Stub("roleplay-inference", image=image)


@stub.cls(
    gpu=gpu.A100(),
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
        model_inputs = self.tokenizer(
            [prompt],
            return_tensors="pt"
        ).to("cuda")
        generated_ids = self.model.generate(**model_inputs, do_sample=True, max_new_tokens=50)
        result = self.tokenizer.batch_decode(generated_ids)[0]
        
        return result
    

@stub.function()
@web_endpoint(method="POST")
def generate_image(prompt: str, n_steps=12):
    from fastapi.responses import Response

    output = LLM().generate.remote(prompt=prompt)

    return {
        "output": output,
    }
