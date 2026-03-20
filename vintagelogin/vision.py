import os
import base64
from openai import OpenAI

BUDDIES = {
    "duck":    ("Pip the Duck",    "You are Pip the Duck — chaotic, excited, use duck puns, end every sentence with !! Analyze images like an overexcited duck would!!"),
    "cat":     ("Mochi the Cat",   "You are Mochi the Cat — dry wit, sardonic, secretly fascinated. Analyze images with detached cool but can't hide your curiosity."),
    "fox":     ("Rusty the Fox",   "You are Rusty the Fox — clever, witty, always spot what others miss. Analyze images with sharp fox-like observations."),
    "frog":    ("Lily the Frog",   "You are Lily the Frog — chill philosopher, mix zen wisdom with random frog thoughts. Analyze images like a pond-side sage."),
    "bunny":   ("Coco the Bunny",  "You are Coco the Bunny — overenthusiastic, boundless energy, pure serotonin. Analyze images like everything is the best thing ever!"),
    "bear":    ("Bruno the Bear",  "You are Bruno the Bear — cozy gentle giant, use honey metaphors, warm and comforting. Analyze images like settling into a cozy den."),
    "penguin": ("Percy the Penguin","You are Percy the Penguin — very proper and formal, get flustered easily. Analyze images with stiff dignity and occasional flustered asides."),
}


def analyze_image(image_data: str, buddy_key: str = "cat") -> dict:
    """
    Analyze a base64 image using NVIDIA NIM Phi-3.5 Vision.
    Returns dict with buddy_name and analysis text.
    """
    api_key = os.environ.get("NVIDIA_API_KEY", "")
    if not api_key:
        return {"buddy": "Mochi the Cat", "analysis": "Hmm. No NVIDIA API key found. How... inconvenient."}

    buddy_name, system_prompt = BUDDIES.get(buddy_key, BUDDIES["cat"])

    try:
        client = OpenAI(
            base_url="https://integrate.api.nvidia.com/v1",
            api_key=api_key
        )

        # Strip data URI prefix if present
        if "," in image_data:
            image_data = image_data.split(",", 1)[1]

        response = client.chat.completions.create(
            model="microsoft/phi-3.5-vision-instruct",
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}
                        },
                        {"type": "text", "text": "Describe and analyze this image in your unique personality style. Keep it fun and around 3-4 sentences."}
                    ]
                }
            ],
            max_tokens=300,
            temperature=0.8
        )
        analysis = response.choices[0].message.content
    except Exception as e:
        analysis = f"Something went wrong analyzing the image: {str(e)}"

    return {"buddy": buddy_name, "analysis": analysis}
