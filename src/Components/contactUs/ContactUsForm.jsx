import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import toast from "react-hot-toast";
import countryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
        phoneNo: `${data.countryCode} ${data.phoneNo}`,
      };

      const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, payload);
      res.data.success
        ? toast.success("Message sent successfully!")
        : toast.error("Something went wrong");
    } catch (error) {
      toast.error("Failed to send message");
      console.log("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-yellow-600 text-lg font-semibold bg-gradient-to-br from-yellow-50 to-white">
        Sending your message...
        <div className="mt-4 custom-loader mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-slate-50 min-h-[100vh] py-10 px-4 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl px-6 py-8 sm:p-10 w-full max-w-3xl border border-slate-200">
        <h2 className="text-3xl font-bold text-richblack-900 mb-8 text-center">
          Get in Touch ✉️
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* 🔤 Name Fields */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstname" className="text-sm font-medium text-slate-700">First Name</label>
              <input
                id="firstname"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
                className="form-style bg-gray-100 focus:ring-2 ring-yellow-400"
              />
              {errors.firstName && <span className="text-red-500 text-sm">First name is required *</span>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastname" className="text-sm font-medium text-slate-700">Last Name</label>
              <input
                id="lastname"
                placeholder="Enter last name"
                {...register("lastName")}
                className="form-style bg-gray-100 focus:ring-2 ring-yellow-400"
              />
            </div>
          </div>

          {/* 📧 Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              {...register("email", { required: true })}
              className="form-style bg-gray-100 focus:ring-2 ring-yellow-400"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required *</span>}
          </div>

          {/* 📱 Phone Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNo" className="text-sm font-medium text-slate-700">Phone Number</label>
            <div className="flex gap-4">
              <select
                id="countryCode"
                {...register("countryCode", { required: true })}
                className="form-style w-[100px] bg-gray-100 focus:ring-2 ring-yellow-400"
              >
                {countryCode.map((item, idx) => (
                  <option key={idx} value={item.code}>
                    {item.code} - {item.country}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                id="phoneNo"
                placeholder="12345 67890"
                {...register("phoneNo", {
                  required: "Phone number is required *",
                  minLength: { value: 8, message: "Phone number too short *" },
                  maxLength: { value: 10, message: "Phone number too long *" },
                })}
                className="form-style flex-1 bg-gray-100 focus:ring-2 ring-yellow-400"
              />
            </div>
            {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo.message}</span>}
          </div>

          {/* ✏️ Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows={6}
              {...register("message", { required: true })}
              className="form-style bg-gray-100 focus:ring-2 ring-yellow-400"
            />
            {errors.message && <span className="text-red-500 text-sm">Message is required *</span>}
          </div>

          {/* 📤 Submit */}
          <button
            type="submit"
            className="rounded-md bg-yellow-500 px-6 py-3 text-center text-[15px] sm:text-[16px] font-bold text-white shadow-md hover:scale-95 hover:brightness-110 transition-all duration-200 disabled:bg-gray-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
