export const formConfig = {
  categories: {
    Food: [
      // --- Basic Info ---
      {
        id: "food_product_name",
        question: "What is the product name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "company_name",
        question: "What is the company name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "industry_type",
        question: "What is the industry type?",
        type: "select",
        options: ["Beverages", "Snacks", "Dairy", "Bakery", "Frozen", "Other"],
        section: "Basic Info"
      },
      {
        id: "industry_type_other",
        question: "Please specify the industry",
        type: "text",
        showIf: { industry_type: "Other" },
        section: "Basic Info"
      },
      {
        id: "product_launch_year",
        question: "What year was the product launched?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "product_origin",
        question: "Where is the product manufactured?",
        type: "text",
        section: "Basic Info"
      },

      // --- Ingredients ---
      {
        id: "ingredients",
        question: "List all ingredients used",
        type: "text",
        section: "Ingredients"
      },
      {
        id: "is_organic",
        question: "Are the ingredients organic?",
        type: "radio",
        options: ["Yes", "No"],
        showIf: { ingredients: "*" },
        section: "Ingredients"
      },
      {
        id: "contains_allergens",
        question: "Does it contain any common allergens?",
        type: "select",
        options: ["Gluten", "Nuts", "Dairy", "Soy", "Eggs", "Other", "None"],
        showIf: { ingredients: "*" },
        section: "Ingredients"
      },
      {
        id: "other_allergens",
        question: "Please specify other allergens",
        type: "text",
        showIf: { contains_allergens: "Other" },
        section: "Ingredients"
      },
      {
        id: "contains_sugar",
        question: "Does it contain sugar?",
        type: "radio",
        options: ["Yes", "No"],
        showIf: { ingredients: "*" },
        section: "Ingredients"
      },
      {
        id: "sugar_type",
        question: "What type of sugar is used?",
        type: "radio",
        options: ["Refined", "Raw", "Unrefined", "Other"],
        showIf: { contains_sugar: "Yes" },
        section: "Ingredients"
      },
      {
        id: "sugar_type_other",
        question: "Please specify the sugar type",
        type: "text",
        showIf: { sugar_type: "Other" },
        section: "Ingredients"
      },
      {
        id: "sugar_quantity",
        question: "What is the sugar content per 100g (in grams)?",
        type: "text",
        showIf: { contains_sugar: "Yes" },
        section: "Ingredients"
      },
      {
        id: "preservatives",
        question: "Are preservatives used?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Ingredients"
      },
      {
        id: "preservative_types",
        question: "Which preservatives are used?",
        type: "text",
        showIf: { preservatives: "Yes" },
        section: "Ingredients"
      },

      // --- Packaging ---
      {
        id: "packaging_material",
        question: "What type of packaging is used?",
        type: "select",
        options: ["Plastic", "Paper", "Glass", "Metal", "Other"],
        section: "Packaging"
      },
      {
        id: "packaging_material_other",
        question: "Please specify the packaging material",
        type: "text",
        showIf: { packaging_material: "Other" },
        section: "Packaging"
      },
      {
        id: "recyclable",
        question: "Is the packaging recyclable?",
        type: "radio",
        options: ["Yes", "No"],
        showIf: { packaging_material: "Plastic" },
        section: "Packaging"
      },
      {
        id: "packaging_biodegradable",
        question: "Is the packaging biodegradable?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Packaging"
      }
    ],

    Clothing: [
      // --- Basic Info ---
      {
        id: "clothing_product_name",
        question: "What is the clothing item name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "company_name",
        question: "What is the company name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "product_launch_year",
        question: "What year was the product launched?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "clothing_type",
        question: "What type of clothing item is it?",
        type: "select",
        options: ["Shirt", "Pants", "Dress", "Jacket", "Underwear", "Other"],
        section: "Basic Info"
      },
      {
        id: "clothing_type_other",
        question: "Please specify the clothing type",
        type: "text",
        showIf: { clothing_type: "Other" },
        section: "Basic Info"
      },
      {
        id: "intended_gender",
        question: "What gender is this product designed for?",
        type: "radio",
        options: ["Unisex", "Male", "Female", "Other"],
        section: "Basic Info"
      },
      {
        id: "intended_gender_other",
        question: "Please specify the gender",
        type: "text",
        showIf: { intended_gender: "Other" },
        section: "Basic Info"
      },

      // --- Materials ---
      {
        id: "fabric",
        question: "What fabric is used?",
        type: "text",
        section: "Materials"
      },
      {
        id: "is_organic_fabric",
        question: "Is the fabric organic?",
        type: "radio",
        options: ["Yes", "No"],
        showIf: { fabric: "*" },
        section: "Materials"
      },
      {
        id: "fabric_origin",
        question: "Where is the fabric sourced from?",
        type: "text",
        section: "Materials"
      },
      {
        id: "blend_type",
        question: "Is it a fabric blend?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Materials"
      },
      {
        id: "blend_details",
        question: "List the fabric blend components",
        type: "text",
        showIf: { blend_type: "Yes" },
        section: "Materials"
      },

      // --- Production ---
      {
        id: "dye_type",
        question: "What type of dye is used?",
        type: "radio",
        options: ["Chemical", "Natural", "No dye", "Other"],
        section: "Production"
      },
      {
        id: "dye_type_other",
        question: "Please specify the dye type",
        type: "text",
        showIf: { dye_type: "Other" },
        section: "Production"
      },
      {
        id: "ethical_labor",
        question: "Was ethical labor ensured?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Production"
      },
      {
        id: "certified_labor",
        question: "Is the labor certified by a third-party?",
        type: "radio",
        options: ["Yes", "No"],
        showIf: { ethical_labor: "Yes" },
        section: "Production"
      },
      {
        id: "factory_location",
        question: "Where was it manufactured?",
        type: "text",
        section: "Production"
      },

      // --- Packaging ---
      {
        id: "packaging_material",
        question: "What is the packaging material?",
        type: "select",
        options: ["Plastic", "Recycled Paper", "Cloth Bag", "None", "Other"],
        section: "Packaging"
      },
      {
        id: "packaging_material_other",
        question: "Please specify the packaging material",
        type: "text",
        showIf: { packaging_material: "Other" },
        section: "Packaging"
      },
      {
        id: "packaging_reusable",
        question: "Is the packaging reusable?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Packaging"
      }
    ],

    Electronics: [
      // --- Basic Info ---
      {
        id: "electronics_product_name",
        question: "What is the product name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "company_name",
        question: "What is the company name?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "product_launch_year",
        question: "What year was the product launched?",
        type: "text",
        section: "Basic Info"
      },
      {
        id: "device_type",
        question: "What type of device is it?",
        type: "select",
        options: ["Smartphone", "Laptop", "Headphones", "Tablet", "Other"],
        section: "Basic Info"
      },
      {
        id: "device_type_other",
        question: "Please specify the device type",
        type: "text",
        showIf: { device_type: "Other" },
        section: "Basic Info"
      },

      // --- Materials ---
      {
        id: "components",
        question: "List key materials/components",
        type: "text",
        section: "Materials"
      },
      {
        id: "recycled_materials",
        question: "Are any recycled materials used?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Materials"
      },

      // --- Battery Info ---
      {
        id: "battery_used",
        question: "Is there a battery?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Battery Info"
      },
      {
        id: "battery_type",
        question: "What type of battery is used?",
        type: "select",
        options: ["Lithium-Ion", "NiMH", "Lead-Acid", "Other"],
        showIf: { battery_used: "Yes" },
        section: "Battery Info"
      },
      {
        id: "battery_type_other",
        question: "Please specify the battery type",
        type: "text",
        showIf: { battery_type: "Other" },
        section: "Battery Info"
      },

      // --- Efficiency ---
      {
        id: "energy_rating",
        question: "Energy Efficiency Rating",
        type: "select",
        options: ["A++", "A+", "A", "B", "C", "Unrated"],
        section: "Efficiency"
      },

      // --- Sustainability ---
      {
        id: "recyclable_parts",
        question: "Are most parts recyclable?",
        type: "radio",
        options: ["Yes", "No"],
        section: "Sustainability"
      },

      // --- Support ---
      {
        id: "warranty_period",
        question: "Warranty period (in years)",
        type: "text",
        section: "Support"
      }
    ]
  }
};
