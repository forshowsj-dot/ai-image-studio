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
async function generateImage() {
  const promptText = document.getElementById("prompt").value;
  const category = document.getElementById("dressCategory").value;
  const style = document.getElementById("styleSelect").value;
  const imageInput = document.getElementById("sourceImage").files[0];

  if (!imageInput) {
    alert("Please upload an image first!");
    return;
  }

  document.getElementById("result").innerHTML = "Generating...";

  // Read uploaded image as base64
  const reader = new FileReader();
  reader.onload = async function() {
    const imageBase64 = reader.result.split(",")[1]; // remove data:image/png;base64,

    // Build final prompt
    const finalPrompt = `${promptText}, category: ${category}, style: ${style}`;

    // Call Hugging Face img2img API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-1.0-img2img",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_API_KEY",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: finalPrompt,
          init_image: imageBase64,
          strength: 0.7
        })
      }
    );

    const blob = await response.blob();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").appendChild(img);
  };

  reader.readAsDataURL(imageInput);
}
