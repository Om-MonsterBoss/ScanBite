const fetchProduct = async (barcodeValue) => {
  try {
    console.log("Fetching product:", barcodeValue);
    const baseUrl=import.meta.env.VITE_BACKEND_API_URL;
    console.log("BaseUrl for backend:-",baseUrl);
    const response = await fetch(
      `${baseUrl}/scanner/barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcodeKey: barcodeValue,
        }),
      }
    );
    console.log("Response from the backend",response)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch product"
      );
    }

    console.log("Product response:", data);

    return data;

  } catch (error) {
    console.error("Product API error:", error);

    throw error;
  }
};

export default fetchProduct;