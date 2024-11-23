import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import Logindata from "../Services/Logindata/Logindata";
import { useDispatch } from 'react-redux';
import { login } from '../Auth/Authslice';

export interface FormValues {
  username: string;
  password: string;
}

const useRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues: FormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be between 3 and 15 characters long.')
      .max(15, 'Username must be between 3 and 15 characters long.')
      .required('Username is required'),
    password: Yup.string()
      .min(3, 'Password must be between 3 and 15 characters long.')
      .max(15, 'Password must be between 3 and 15 characters long.')
      .required('Password is required'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await Logindata.post('/usermanagementnew/Auth/LoginWithPassword', {
        username: values.username,
        password: values.password,
      });

      const { isSuccess, ...userData } = response.data;

      if (isSuccess) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        Swal.fire({
          title: 'موفقیت آمیز!',
          text: 'ورود شما با موفقیت انجام شد',
          icon: 'success',
          confirmButtonText: 'بله',
        }).then(() => {
          dispatch(login(userData));
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'خطا!',
          text: 'یوزرنیم یا پسورد نامعتبر هست',
          icon: 'error',
          confirmButtonText: 'تلاش مجدد',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'در فرایند مشکلی پیش آمده',
        icon: 'error',
        confirmButtonText: 'تلاش مجدد',
      });
      console.log(error);
    }
    setSubmitting(false);
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useRegistrationForm;
