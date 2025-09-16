"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/navigation";
import CKEditorWrapper from "@/components/CKEditorWrapper";
export default function CouponForm({searchParams}) {

 const id = searchParams?.id;   const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
 const [authors, setauthors] = useState([]);
  const [formData, setFormData] = useState({
    enabled: true,
    image: "",
    brand: "",
    offerType: "",
    couponCode: "",
    discount: "",
    inputType: "",
    headline: "",
    title: "",
    link: "",
    shortDescription: "",
    likes: 0,
    startDate: "",
    endDate: "",
    status: "",
    description: "",
  });

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch("/api/brands");
      const data = await res.json();
      setBrands(data);
    };
    fetchBrands();
     fetch("/api/authors")
            .then((res) => res.json())
            .then((data) => setauthors(data));
  }, []);

  // Fetch coupon if editing
  useEffect(() => {
    if (id) {
      const fetchCoupon = async () => {
        try {
          const res = await fetch(`/api/admin/coupons/${id}`);
          const data = await res.json();
          setFormData({
            enabled: data.enabled ?? true,
            image: data.image ?? "",
            brand: data.brand ?? "",
            offerType: data.offerType ?? "",
            couponCode: data.couponCode ?? "",
            discount: data.discount ?? "",
            inputType: data.inputType ?? "",
            headline: data.headline ?? "",
            title: data.title ?? "",
            link: data.link ?? "",
            shortDescription: data.shortDescription ?? "",
            likes: data.likes ?? 0,
            startDate: data.startDate ? data.startDate.slice(0, 10) : "",
            endDate: data.endDate ? data.endDate.slice(0, 10) : "",
            status: data.status ?? "",
            description: data.description ?? "",
          });
        } catch (error) {
          console.error("Error fetching coupon:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCoupon();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCkChange = (field, event, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(id ? `/api/admin/coupons/${id}` : "/api/admin/coupons", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Coupon ${id ? "Updated" : "Created"} Successfully!`);
        router.push("/admin/coupon-list"); // redirect to list page
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
      alert("Failed to save coupon.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>{id ? "Edit Coupon" : "Create Coupon"}</h3>
      <form onSubmit={handleSubmit} className="row g-3">

        {/* Enable/Disable */}
        <div className="col-12 form-check">
          <input
            type="checkbox"
            name="enabled"
            className="form-check-input"
            checked={formData.enabled}
            onChange={handleChange}
          />
          <label className="form-check-label">Enable Coupon</label>
        </div>

        {/* Image Upload */}
        <div className="col-md-4">
          <label className="form-label">Coupon Image</label>
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
                setFormData({ ...formData, image: data.url });
              }
            }}
          />
          <input
            type="text"
            name="image"
            className="form-control mt-2"
            value={formData.image}
            onChange={handleChange}
          />
          {formData.image && (
            <div className="mt-2">
              <img src={formData.image} alt="Featured" style={{ maxWidth: "200px", borderRadius: "8px" }} />
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="col-md-4">
          <label className="form-label">Select Brand</label>
          <select
            name="brand"
            className="form-select"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="">-- Select Brand --</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.pageSlug}>
                {brand.brandName} ({brand.country?.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Offer Type */}
        <div className="col-md-4">
          <label className="form-label">Offer Type</label>
          <select
            className="form-control"
            name="offerType"
            value={formData.offerType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Code</option>
            <option value="2">Sale</option>
            <option value="3">Discount</option>
            <option value="4">Mobile App</option>
            <option value="5">Cashback</option>
            <option value="6">Giftcard</option>
          </select>
        </div>

        {/* Coupon Code */}
        <div className="col-md-3">
          <label className="form-label">Coupon Code</label>
          <input
            type="text"
            name="couponCode"
            className="form-control"
            value={formData.couponCode}
            onChange={handleChange}
          />
        </div>

        {/* Discount */}
        <div className="col-md-3">
          <label className="form-label">Discount</label>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
  <div className="col-md-3">
          <label className="form-label">Added By</label>
          <input
            type="text"
            name="addedby"
            className="form-control"
            value={formData.addedby}
            onChange={handleChange}
          />
        </div>

        {/* Input Type */}
        <div className="col-md-3">
          <label className="form-label">Select Input Type</label>
          <select
            name="inputType"
            className="form-control"
            value={formData.inputType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Exclusive</option>
            <option value="2">Event Deal</option>
            <option value="3">Popular</option>
          </select>
        </div>

        {/* Headline */}
        <div className="col-md-8">
          <label className="form-label">Offer Headline</label>
          <input
            type="text"
            name="headline"
            className="form-control"
            value={formData.headline}
            onChange={handleChange}
          />
        </div>
 <div className="mb-3  col-md-4">
                        <label className="form-label">Author</label>
                        {/* <input
                            type="text"
                            name="author"
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                        /> */}
                        <select
                            name="authors"
                            className="form-control"
                            value={formData.authors}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Author --</option>
                            {authors.map((author) => (
                                <option key={author.authorName} value={author.userName}>
                                    {author.authorName}
                                </option>
                            ))}
                        </select>
                    </div>

        {/* Title */}
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Link */}
        <div className="col-md-6">
          <label className="form-label">Link</label>
          <input
            type="text"
            name="link"
            className="form-control"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        {/* Short Description */}
        <div className="col-md-12">
          <label className="form-label">Short Description</label>
            <CKEditor
            editor={ClassicEditor}
            data={formData.shortDescription}
            onChange={(event, editor) =>
              handleCkChange("shortDescription", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          />
          {/* <textarea
            name="shortDescription"
            className="form-control"
            value={formData.shortDescription}
            onChange={handleChange}
          /> */}
        </div>

        {/* Likes */}
        <div className="col-md-3">
          <label className="form-label">Likes</label>
          <input
            type="number"
            name="likes"
            className="form-control"
            value={formData.likes}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="col-md-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
           value={
      formData.startDate ||
      new Date().toISOString().split("T")[0] // current date in yyyy-mm-dd
    }
    onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="col-md-3">
          <label className="form-label">Select Status</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
            <option value="3">Expired</option>
          </select>
        </div>

        {/* Description */}
        {/* <div className="col-md-12">
          <label className="form-label">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={(event, editor) =>
              handleCkChange("description", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          />
        </div> */}
 <div className="col-md-12">
          <label className="form-label">Terms & Conditions</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.termsconditions}
            onChange={(event, editor) =>
              handleCkChange("termsconditions", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          />
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {id ? "Update Coupon" : "Save Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
}
