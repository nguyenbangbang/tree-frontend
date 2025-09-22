import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddTreeMutation } from '../../../redux/features/trees/treesApi';

const AddTree = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addTree, {isLoading, isError}] = useAddTreeMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
        
        const newTreeData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addTree(newTreeData).unwrap();
            Swal.fire({
                title: "Tree added",
                text: "Your tree is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add tree. Please try again.")   
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Tree</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter tree title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter tree description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'Mọng nước', label: 'Mọng nước' },
            { value: 'Trong nhà', label: 'Trong nhà' },
            { value: 'Có hoa', label: 'Có hoa' },
            { value: 'Bonsai', label: 'Bonsai' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Thêm cây</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddTree