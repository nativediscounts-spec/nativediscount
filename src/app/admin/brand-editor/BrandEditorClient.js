
"use client";

import { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
export default function BrandEditor({searchParams}) {
    const id = searchParams?.id;
  
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    brandName: "",
    pageSlug: "",
    brandTitle: "",
    brandUrl: "",
    brandLogo: "",
    category: "",
    country: "",
    featuredBrand: false,
    popularBrand: false,
    trendingBrand: false,
    status: "Active",

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
        .then((data) => setFormData(data));
    }
  }, [id]);
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
        <div className="mb-3">
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
        </div>  <div className="mb-3">
          <label className="form-label">Select Categories</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Select Country --</option>
            {categories.map((category) => (
              <option key={category.categoryTitle} value={category.categoryTitle}>
                {category.categoryTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label className="form-label">Page Slug</label>
          <input
            type="text"
            name="pageSlug"
            value={formData.pageSlug}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand Title</label>
          <input
            type="text"
            name="brandTitle"
            value={formData.brandTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand URL</label>
          <input
            type="url"
            name="brandUrl"
            value={formData.brandUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="featuredBrand"
            checked={formData.featuredBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Featured Brand</label>
        </div>

        <div className="form-check mb-3">
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
