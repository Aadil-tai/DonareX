import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import contactImage from '../assets/Hero/left3.svg';
import { useForm } from 'react-hook-form';
import { sendContactForm, clearStatus } from '../redux/ContactSlice';

const ContactUs = () => {

    const { status, responseMessage } = useSelector(state => state.contact);

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const formRef = useRef();
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const resultAction = await dispatch(sendContactForm(data));

        if (sendContactForm.fulfilled.match(resultAction)) {
            toast.success('Message sent successfully!');
            reset();
            dispatch(clearStatus());
        } else if (sendContactForm.rejected.match(resultAction)) {
            toast.error(resultAction.payload || 'Something went wrong!');
            dispatch(clearStatus());
        }
    };
    return (
        <section id="contact" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Get in Touch</h2>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block font-medium mb-1">Name *</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full border p-3 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your Full Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email *</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email format',
                                },
                            })}
                            className={`w-full border p-3 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Message *</label>
                        <textarea
                            {...register('message', { required: 'Message is required' })}
                            rows={5}
                            className={`w-full border p-3 rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Type your message here"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded font-semibold"
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>

                </form>
            </div>

            <div className="hidden md:block">
                <img src={contactImage} alt="Contact Illustration" className="w-full h-auto rounded-lg" />
            </div>
        </section>
    );
};

export default ContactUs;
