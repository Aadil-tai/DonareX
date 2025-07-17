import React from 'react';
import { useForm } from 'react-hook-form';
import visionImg1 from '../assets/contactus.jpg';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import Marquee from '../components/Marquee';
import { toast } from 'react-toastify';


const Donate = () => {
    const {
        register,
        watch,
        reset,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [convertedAmount, setConvertedAmount] = useState(null);
    const [convertedCurrency, setConvertedCurrency] = useState("INR");

    const [activeAmount, setActiveAmount] = useState("1000");
    const [customAmount, setCustomAmount] = useState("");
    const selectedTip = watch("tip") || "0";
    const getTotalAmount = () => {
        const base = activeAmount === "Other" ? Number(customAmount) : Number(activeAmount);
        const tipPercent = Number(selectedTip);
        if (isNaN(base) || base <= 0) return 0;
        return base + (base * tipPercent) / 100;
    };
    const [countryCode, setCountryCode] = useState("in");


    const amounts = ["1000", "2500", "4000", "Other"];

    const [phone, setPhone] = useState("");
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);

    const onPhoneChange = (value, data) => {
        setPhone(value);
        setCountryCode(data.countryCode);
    };

    const onSubmit = async (data) => {
        const amount = activeAmount === "Other" ? Number(customAmount) : Number(activeAmount);
        const tip = Number(data.tip || 0);

        try {
            const response = await axios.post(`${backendURL}/api/create-order`, {
                name: data.name,
                email: data.email,
                phone,
                amount,
                tip,
                anonymous: data.anonymous || false,
                address: data.address,
                currency: "INR"
            });

            const orderDetails = response.data;

            const options = {
                key: orderDetails.key,
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                name: orderDetails.name,
                order_id: orderDetails.orderId,
                handler: function (response) {
                    toast("Payment successful! Payment ID: " + response.razorpay_payment_id);
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: phone,
                },
                theme: {
                    color: "#fcb35c",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
            reset();

        } catch (err) {
            console.error("Payment failed:", {
                message: err.message,
                name: err.name,
                code: err.code,
                stack: err.stack,
                response: err.response?.data || "No response data",
                status: err.response?.status || "No status",
                url: err.config?.url || "No request URL"
            });

            toast("Something went wrong while creating the payment.");
        }
    };


    return (
        <div className='p-4 '>
            <Marquee />
            <section className="flex flex-col md:flex-row items-center justify-between p-6 lg:p-10 rounded-xl  max-w-6xl mx-auto mt-10">

                <div className='flex flex-col'>

                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Contribute to change in your community
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Help us bring care, dignity, and connection to our elders.
                    </p>
                    <div className="grid grid-cols-2 lg:flex gap-2 mb-4">
                        {amounts.map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => {
                                    setActiveAmount(val);
                                    if (val !== "Other") setCustomAmount("");
                                }}
                                className={`px-4 py-2  rounded text-sm transition ${activeAmount === val
                                    ? "bg-primary text-white"
                                    : "bg-gray-900 text-white hover:bg-gray-700"
                                    }`}
                            >
                                {val === "Other" ? "Other" : `₹${val}`}
                            </button>
                        ))}
                    </div>
                    <div className="w-full  flex justify-center">
                        <img
                            src={visionImg1}
                            alt="Support Elders"
                            className=" object-cover lg:w-[70%] lg:h-[280px]"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10">


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-2">
                            <label className="block font-semibold mb-2">Tip (optional)</label>
                            <div className="flex flex-wrap gap-4">
                                {["0", "5", "10", "18"].map((tip) => (
                                    <label
                                        key={tip}
                                        className="flex items-center gap-2 text-sm cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            value={tip}
                                            {...register("tip")}
                                            className="accent-primary"
                                        />
                                        <span>{tip}%</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <label className="block mb-2 font-semibold">Name *</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Full Name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}


                        <label className="flex items-center mt-2 mb-4 text-sm">
                            <input type="checkbox" {...register("anonymous")} className="mr-2" />
                            Make my contribution anonymous
                        </label>

                        <label className="block mb-2 font-semibold">Email ID *</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email",
                                },
                            })}
                            className={`w-full border p-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}

                        <div className="flex flex-col gap-2 mb-4">
                            <label className="block mb-2 font-semibold mt-4">Mobile Number *</label>
                            <PhoneInput
                                country={"in"}
                                value={phone}
                                onChange={(value, data, event, formattedValue) => {
                                    setPhone(value);
                                    setCountryCode(data.countryCode);
                                    setIsPhoneTouched(true);
                                }}
                                enableSearch
                                inputClass={`w-full pl-10 !py-2 !rounded ${isPhoneTouched && phone.length < 6 ? '!border-red-500' : '!border-gray-300'}`}
                                inputStyle={{ width: "100%" }}
                                containerClass="mb-2"
                                inputProps={{
                                    required: true,
                                    name: "phone",
                                }}
                            />
                            {isPhoneTouched && phone.length < 6 && (
                                <p className="text-red-500 text-sm">Please enter a valid number</p>
                            )}


                        </div>

                        {activeAmount === "Other" && (
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold mt-4">Amount *</label>

                                <input
                                    type="number"
                                    min="1"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="Enter custom amount"
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>
                        )}

                        <label className="block mb-2 font-semibold mt-4">Address *</label>
                        <input
                            {...register("address", { required: "Address is required" })}
                            className={`w-full border p-2 rounded ${errors.address ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Your Address"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}

                        <button
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded w-full font-semibold mt-4"
                        >
                            Contribute : ₹{getTotalAmount().toFixed(2)}
                        </button>
                    </form>
                </div >
            </section >
        </div>
    );
};

export default Donate;
