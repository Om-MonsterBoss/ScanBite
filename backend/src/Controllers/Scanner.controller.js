import Redis from "ioredis";
import connection from "../config/redis.js";

export const getBarcodtext = async (req, res) => {
    console.log("Requested body",req.body)
    const { barcodeKey } = req.body;

    if (!barcodeKey) {
        return res.status(404).json({
            success: false,
            message: "Barcode key not found"
        })
    }

    // Fetch open food facts
    String(barcodeKey).trim();

    const productKey = `product:${barcodeKey}`;
    console.log("Product key:", productKey);

    const cachedProduct = await connection.get(productKey);
    if (cachedProduct) {
        console.log("Redis cache HIT");

        return res.status(200).json({
            success: true,
            source: "redis",
            product: JSON.parse(cachedProduct)
        });
    }

    const response = await fetch(
        `https://world.openfoodfacts.org/api/v3/product/${barcodeKey}`,
        {
            headers: {
                "User-Agent": "ScanBite/1.0"
            }
        }
    );
    console.log("Response",response)
    if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: "Failed to fetch product from Open Food Facts"
            });
        }

        const data = await response.json();

        // 3. Product doesn't exist
        if (!data.product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // 4. Get product
        const product = data.product;

        // 5. Store useful data instead of entire OFF response
        const productData = {
            barcodeKey,

            name: product.product_name || null,
            brand: product.brands || null,
            quantity: product.quantity || null,

            image: product.image_front_url || null,

            ingredients: product.ingredients_text_en ||
                         product.ingredients_text ||
                         null,

            allergens: product.allergens || null,

            nutrition: {
                calories:
                    product.nutriments?.["energy-kcal_100g"] ?? null,

                fat:
                    product.nutriments?.fat_100g ?? null,

                saturatedFat:
                    product.nutriments?.["saturated-fat_100g"] ?? null,

                carbohydrates:
                    product.nutriments?.carbohydrates_100g ?? null,

                sugar:
                    product.nutriments?.sugars_100g ?? null,

                protein:
                    product.nutriments?.proteins_100g ?? null,

                fiber:
                    product.nutriments?.fiber_100g ?? null,

                salt:
                    product.nutriments?.salt_100g ?? null
            },

            novaGroup: product.nova_group ?? null,

            nutriScore:
                product.nutriscore_grade ?? null,

            ecoScore:
                product.ecoscore_grade ?? null,

            source: "openfoodfacts"
        };

        // 6. Store in Redis for 7 days
        await connection.set(
            productKey,
            JSON.stringify(productData),
            "EX",
            60 * 60 * 24 * 7
        );

        console.log("Product stored in Redis");


    await connection.set("Barcode", product)
    console.log("Product key", product)
     return res.status(200).json({
            success: true,
            source: "openfoodfacts",
            product: productData
        });
}