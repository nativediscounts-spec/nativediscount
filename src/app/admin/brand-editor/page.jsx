
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import dynamic from "next/dynamic";

import CKEditorWrapper from "@/components/CKEditorWrapper";

export default function BrandEditor({searchParams}) {
    const id = searchParams?.id;
    const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    brandName: "",
    pageSlug: "",
    brandTitle: "",
    brandUrl: "",
    brandLogo: "",
    category: "",
    categoryTitle: "",
    country: "",
    featuredBrand: false,
    popularBrand: false,
    trendingBrand: false,
    status: "Active",
   aboutCompany: "",
    whyChoose: [""],
    bestDeals: [""],
    latestCoupons: [{ code: "", discount: "" }],
    stepsToUse: [""],
    plans: [{ plan: "", price: "" }],
    seasonalSales: "",
    paymentMethods: [],
    customerSupport: [""],
    faqs: [{ question: "", answer: "" }],
    brandEditor: [{ content: "", position: "default" }],
  });
  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
        
      fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  useEffect(() => {
    if (id) {
      fetch(`/api/admin/brands/${id}`)
        .then((res) => res.json())
        .then((data) =>   setFormData({
            ...data,
            brandEditor: Array.isArray(data.brandEditor)
              ? data.brandEditor.map((ed) =>
                  typeof ed === "string"
                    ? { content: ed, position: "default" }
                    : { content: ed.content || "", position: ed.position || "default" }
                )
              : [{ content: data.brandEditor || "", position: "default" }],
          })
        );
    }
  }, [id]);
  
  const addEditor = () => {
    setFormData({
      ...formData,
      brandEditor: [...formData.brandEditor, { content: "", position: "default" }],
    });
  };
  const removeEditor = (index) => {
    const newEditors = [...formData.brandEditor];
    newEditors.splice(index, 1);
    setFormData({ ...formData, brandEditor: newEditors });
  };
  const handleEditorChange = (value, index) => {
    const newEditors = [...formData.brandEditor];
    newEditors[index].content = value;
    setFormData({ ...formData, brandEditor: newEditors });
  };

  const handlePositionChange = (value, index) => {
    const newEditors = [...formData.brandEditor];
    newEditors[index].position = value;
    setFormData({ ...formData, brandEditor: newEditors });
  };
    const addField = (field, obj = null) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], obj || ""],
    });
  };


  const handleArrayChange = (e, field, index, key = null) => {
    const newArray = [...formData[field]];
    if (key) {
      newArray[index][key] = e.target.value;
    } else {
      newArray[index] = e.target.value;
    }
    setFormData({ ...formData, [field]: newArray });
  };
  // Function to create slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/-+/g, "-"); // collapse multiple -
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "brandName") {
      setFormData({
        ...formData,
        brandName: value,
        pageSlug: generateSlug(value), // auto-generate slug only when title changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // if (type === "checkbox") {
    //   setFormData({ ...formData, [name]: checked });
    // } else {
    //   setFormData({ ...formData, [name]: value });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/admin/brands/${id}` : `/api/admin/brands`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Brand saved successfully!");
      router.push("/admin/brands");
    } else {
      alert("Error saving brand");
    }
  };

  return (
     
       <div className="container mt-4">
      <h2>{id ? "Edit Brand" : "Add New Brand"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3 mt-3">
          <fieldset className="mt-4">
            <legend>SEO Details</legend>
            <div className="row">
              <Form.Group controlId="SEOTitle" className="col-md-6">
                <Form.Label >SEO Title</Form.Label>
                <Form.Control type="text" placeholder="SEO Title" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="mb-2" />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Label>SEO Keyword</Form.Label> <Form.Control type="text" placeholder="SEO Keywords" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} className="mb-2" />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>SEO Description</Form.Label>
                <Form.Control type="text" placeholder="SEO Description" name="seoDescription" value={formData.seoDescription} onChange={handleChange} />
              </Form.Group>
            </div>
          </fieldset>
        </div>
        <div className="row">
        <div className="mb-3 col-md-4">
          <label className="form-label">Select Country</label>
          <select
            name="country"
            className="form-control"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">-- Select Country --</option>
            {countries.map((country) => (
              <option key={country.countryCode} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
          </select>
        </div>  <div className="mb-3 col-md-4">
          <label className="form-label">Select Categories</label>
     <select
  name="category"
  className="form-control"
  value={formData.category}
  onChange={(e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const categoryId = selectedOption.value;
    const categoryTitle = selectedOption.getAttribute("data-title");

    // Update state for both fields
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      categoryTitle: categoryTitle,
    }));
  }}
>
  <option value="">-- Select Categories --</option>
  {categories.map((category) => (
    <option
      key={category._id}
      value={category._id}
      data-title={category.categoryTitle}
    >
      {category.categoryTitle}
    </option>
  ))}
</select>

{/* Hidden input (optional, if you need it in form submission) */}
<input type="hidden" name="categoryTitle" value={formData.categoryTitle || ""} />


        </div>

        <div className="mb-3 col-md-4">
          <label className="form-label">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label">Featured Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formDataImg = new FormData();
              formDataImg.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formDataImg,
              });

              const data = await res.json();
              if (data.url) {
                setFormData({ ...formData, brandLogo: data.url });
              }
            }}
          />
          <input
            type="text"
            name="brandLogo"
            className="form-control"
            value={formData.brandLogo}
            onChange={handleChange}
          />
          {formData.brandLogo && (
            <div className="mt-2">
              <img
                src={formData.brandLogo}
                alt="Featured"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label">Page Slug</label>
          <input
            type="text"
            name="pageSlug"
            value={formData.pageSlug}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 col-md-4">
          <label className="form-label">Brand Title</label>
          <input
            type="text"
            name="brandTitle"
            value={formData.brandTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 col-md-4">
          <label className="form-label">Brand URL</label>
          <input
            type="url"
            name="brandUrl"
            value={formData.brandUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

       {/* About Company */}
        <div className="mb-3">
          <label className="form-label">About Company</label>
          <textarea
            name="aboutCompany"
            className="form-control"
            rows="4"
            value={formData.aboutCompany}
            onChange={handleChange}
          ></textarea>
        </div>

  {/* Multiple Editors */}
  <div className="col-md-12">
      {formData.brandEditor.map((editor, index) => (
        <div key={index} className="mb-3 border rounded p-2">
          <CKEditorWrapper
            value={editor.content}
            onChange={(value) => handleEditorChange(value, index)}
          />

          {/* Position Select */}
          <div className="mt-2">
            <label className="form-label me-2">Position:</label>
            <select
              value={editor.position}
              onChange={(e) =>
                setFormData((prev) => {
                  const updated = [...prev.brandEditor];
                  updated[index].position = e.target.value;
                  return { ...prev, brandEditor: updated };
                })
              }
              className="form-select w-auto d-inline-block"
            >
              <option value="default">Default</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Remove Editor */}
          <Button
            variant="danger"
            size="sm"
            className="mt-2"
            onClick={() =>
              setFormData({
                ...formData,
                brandEditor: formData.brandEditor.filter((_, i) => i !== index),
              })
            }
            disabled={formData.brandEditor.length === 1}
          >
            Remove
          </Button>
        </div>
      ))}

      {/* Add Editor */}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          setFormData({
            ...formData,
            brandEditor: [
              ...formData.brandEditor,
              { content: "", position: "default" },
            ],
          })
        }
      >
        + Add Editor
      </Button>
    </div>
        {/* Why Choose */}
        <div className="mb-3">
          <label className="form-label">Why Choose (points)</label>
          {formData.whyChoose.map((point, i) => (
            <input
              key={i}
              type="text"
              className="form-control mb-2"
              value={point}
              onChange={(e) => handleArrayChange(e, "whyChoose", i)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("whyChoose")}
          >
            + Add Point
          </button>
        </div>

        {/* Best Deals */}
        <div className="mb-3">
          <label className="form-label">Best Deals</label>
          {formData.bestDeals.map((deal, i) => (
            <input
              key={i}
              type="text"
              className="form-control mb-2"
              value={deal}
              onChange={(e) => handleArrayChange(e, "bestDeals", i)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("bestDeals")}
          >
            + Add Deal
          </button>
        </div>

        {/* Coupons */}
        <div className="mb-3">
          <label className="form-label">Latest Coupons</label>
          {formData.latestCoupons.map((coupon, i) => (
            <div className="row mb-2" key={i}>
              <div className="col">
                <input
                  type="text"
                  placeholder="Code"
                  className="form-control"
                  value={coupon.code}
                  onChange={(e) =>
                    handleArrayChange(e, "latestCoupons", i, "code")
                  }
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Discount"
                  className="form-control"
                  value={coupon.discount}
                  onChange={(e) =>
                    handleArrayChange(e, "latestCoupons", i, "discount")
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("latestCoupons", { code: "", discount: "" })}
          >
            + Add Coupon
          </button>
        </div>

        {/* Steps to Use */}
        <div className="mb-3">
          <label className="form-label">Steps to Use</label>
          {formData.stepsToUse.map((step, i) => (
            <input
              key={i}
              type="text"
              className="form-control mb-2"
              value={step}
              onChange={(e) => handleArrayChange(e, "stepsToUse", i)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("stepsToUse")}
          >
            + Add Step
          </button>
        </div>

        {/* Plans */}
        <div className="mb-3">
          <label className="form-label">Plans</label>
          {formData.plans.map((plan, i) => (
            <div className="row mb-2" key={i}>
              <div className="col">
                <input
                  type="text"
                  placeholder="Plan"
                  className="form-control"
                  value={plan.plan}
                  onChange={(e) =>
                    handleArrayChange(e, "plans", i, "plan")
                  }
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control"
                  value={plan.price}
                  onChange={(e) =>
                    handleArrayChange(e, "plans", i, "price")
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("plans", { plan: "", price: "" })}
          >
            + Add Plan
          </button>
        </div>

        {/* Seasonal Sales */}
        <div className="mb-3">
          <label className="form-label">Seasonal Sales</label>
          <input
            type="text"
            name="seasonalSales"
            className="form-control"
            value={formData.seasonalSales}
            onChange={handleChange}
          />
        </div>

        {/* Payment Methods */}
        <div className="mb-3">
          <label className="form-label">Payment Methods</label>
          <input
            type="text"
            name="paymentMethods"
            className="form-control"
            placeholder="Separate by commas"
            value={formData.paymentMethods}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethods: e.target.value.split(","),
              })
            }
          />
        </div>

        {/* Customer Support */}
        <div className="mb-3">
          <label className="form-label">Customer Support Steps</label>
          {formData.customerSupport.map((support, i) => (
            <input
              key={i}
              type="text"
              className="form-control mb-2"
              value={support}
              onChange={(e) => handleArrayChange(e, "customerSupport", i)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("customerSupport")}
          >
            + Add Step
          </button>
        </div>

        {/* FAQs */}
        <div className="mb-3">
          <label className="form-label">FAQs</label>
          {formData.faqs.map((faq, i) => (
            <div className="mb-2" key={i}>
              <input
                type="text"
                placeholder="Question"
                className="form-control mb-1"
                value={faq.question}
                onChange={(e) =>
                  handleArrayChange(e, "faqs", i, "question")
                }
              />
              <input
                type="text"
                placeholder="Answer"
                className="form-control"
                value={faq.answer}
                onChange={(e) =>
                  handleArrayChange(e, "faqs", i, "answer")
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("faqs", { question: "", answer: "" })}
          >
            + Add FAQ
          </button>
        </div>

        </div>
 <div className="form-check mb-3 col-md-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="featuredBrand"
            checked={formData.featuredBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Featured Brand</label>
        </div>
        <div className="form-check mb-3 ">
          <input
            className="form-check-input"
            type="checkbox"
            name="popularBrand"
            checked={formData.popularBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Popular Brand</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="trendingBrand"
            checked={formData.trendingBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Trending Brand</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? "Update Brand" : "Add Brand"}
        </button>
      </form>
    </div>

  );
}
