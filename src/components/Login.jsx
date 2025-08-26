import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const[message, setMessage]= useState("")
    const {loginUser,signInWithGoogle}= useAuth();
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async(data) => {
        try {
            await loginUser(data.email, data.password)
            alert("Đăng nhập thành công");
            navigate("/")
        } catch (error) {
            setMessage("Vui lòng cung cấp email và mật khẩu hợp lệ") 
            console.error(error)
        }
      }

      const handleGoogleSignIn= async ()=>{
        try {
            await signInWithGoogle();
            alert(" Đăng nhập thành công!");
            navigate("/")
        } catch (error) {
            alert("Đăng nhập thất bại. Vui lòng thử lại") 
            console.error(error)
        }
      }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Vui lòng đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' 
                    htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })} 
                    type='email' name='email' id='email' placeholder='Địa chỉ Email'
                     className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' 
                    htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })}
                    type='password' name='password' id='password' placeholder=' Nhập mật khẩu'
                     className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
                </div>
                <div>
                    <button  className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-md flex items-center gap-1 w-fit transition-colors duration-200">Đăng nhập</button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>Nếu chưa có tài khoản, Vui lòng <Link to="/register" className='text-green-500 hover:text-green-700'>Đăng ký</Link></p> 

            {/* google sign in */}
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle  className='mr-2'/>
                Sign in with Google
                </button>
            </div> 
        </div>
    </div>
  )
}

export default Login