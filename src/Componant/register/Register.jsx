import React from 'react'
//  import './Register.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { langContext } from '../../Store/Context'; 
import { useContext } from 'react';

export default function Register() {
    const { lang, ChangeLang } = useContext(langContext); 
    function signUp(val) {
       alert('register success')
    }
    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'minLength is 3').max(20, 'maxlength is 20').required('Name is required'),
        email: Yup.string().required('Email is required').email('Enter a valid email'),
        dob: Yup.date().required('Date of Birth is required'),
        sex: Yup.string().required('Gender is required'),
        password: Yup.string().required('Password is required') .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$_!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character'
        ),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Phone'),
        pass2: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords do not match')
    });

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            dob: '',
            sex: '',
            password: '',
            phone: '',
            pass2: '',
        },
        validationSchema: validationSchema,
        onSubmit: signUp
    });

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="container mt-3 shadow p-5">
            <form onSubmit={formik.handleSubmit}>
                <div className="row jumbotron box8">
                    <div className="col-sm-12 mx-t3 mb-4">
                        <h2 className="text-center text-danger">Register</h2>
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            id="dob"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.dob}
                        />
                        {formik.errors.dob && formik.touched.dob ? <p className='text-danger'>{formik.errors.dob}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="sex">Gender</label>
                        <select
                            className="form-control"
                            name="sex"
                            id="sex"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.sex}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unspecified">Unspecified</option>
                        </select>
                        {formik.errors.sex && formik.touched.sex ? <p className='text-danger'>{formik.errors.sex}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone number"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ''}
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="pass2">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="pass2"
                            id="pass2"
                            placeholder="Re-enter your password"
                            required=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.pass2}
                        />
                        {formik.errors.pass2 && formik.touched.pass2 ? <p className='text-danger'>{formik.errors.pass2}</p> : ''}
                    </div>
                    <div className="col-sm-12 form-group">
                        <input
                            type="checkbox"
                            className="form-check d-inline"
                            id="terms"
                            required=""
                        />
                        <label htmlFor="terms" className="form-check-label">
                            &nbsp;I accept all terms and conditions.
                        </label>
                    </div>
                    <div className="col-sm-12 form-group">
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' style={{marginTop:'30px'}}  className="btn btn-danger float-right">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


