from pathlib import Path
from modal import Image, Mount, Stub, gpu, method, web_endpoint

CURR_DIR = str(Path(__file__).parent.resolve())

stub = Stub(
    name="infrence_backend", 
    image=(
        Image.debian_slim()
        .apt_install(
            "libglib2.0-0",
            "libsm6", 
            "libxrender1", 
            "libxext6", 
            "ffmpeg", 
            "libgl1",
        )
        .pip_install(
            "diffusers~=0.19",
            "invisible_watermark~=0.1",
            "transformers~=4.31",
            "accelerate~=0.21",
            "safetensors~=0.3",
        )
    )
)


@stub.cls(
    gpu=gpu.A10G(),
    container_idle_timeout=240,
    mounts=[Mount.from_local_dir(
        local_path=CURR_DIR+"/huggingface_repos",
        remote_path="/models"
    )]
)
class LCM_DreamShaper7:
    def __enter__(self):
        import torch
        from diffusers import DiffusionPipeline

        self.pipeline = DiffusionPipeline.from_pretrained(
            "/models/LCM_Dreamshaper_v7",
            safety_checker=None
        )

        self.pipeline.to(torch_device="cuda", torch_dtype=torch.float32)

    @method()
    def inference(self, prompt, n_steps=12, guidance_scale=8.0, lcm_origin_steps=50):
        image = self.pipeline(
            prompt=prompt, 
            num_inference_steps=n_steps,
            guidance_scale=guidance_scale,
            lcm_origin_steps=lcm_origin_steps,
            output_type="pil"
        ).images[0]

        import io

        byte_stream = io.BytesIO()
        image.save(byte_stream, format="PNG")
        image_bytes = byte_stream.getvalue()

        return image_bytes

@stub.function()
@web_endpoint(method="POST")
def generate_image(prompt: str, n_steps=12):
    from fastapi.responses import Response

    image_bytes = LCM_DreamShaper7().inference.remote(prompt, n_steps)
    return Response(content=image_bytes, media_type="image/png")


@stub.local_entrypoint()
def main(prompt: str, steps: int = 4, scale: float = 8.0):
    image_bytes = LCM_DreamShaper7().inference.remote(prompt, steps)

    dir = Path(__file__).parent.resolve() / "generations"
    if not dir.exists():
        dir.mkdir(exist_ok=True, parents=True)

    output_path = dir / f"{prompt.replace(' ', '_')}.png"
    print(f"Saving it to {output_path}")
    with open(output_path, "wb") as f:
        f.write(image_bytes)