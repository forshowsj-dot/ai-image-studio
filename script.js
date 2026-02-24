async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("result").innerHTML = "Generating...";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const blob = await response.blob();
  const img = document.createElement("img");
  img.src = URL.createObjectURL(blob);
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").appendChild(img);
}
