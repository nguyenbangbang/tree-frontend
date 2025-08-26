import React, { useEffect } from 'react'
import InputField from '../addTree/InputField'
import SelectField from '../addTree/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchTreeByIdQuery, useUpdateTreeMutation } from '../../../redux/features/trees/treesApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateTree = () => {
  const { id } = useParams();
  const { data: treeData, isLoading, isError, refetch } = useFetchTreeByIdQuery(id);
  const [updateTree] = useUpdateTreeMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (treeData) {
      setValue('title', treeData.title);
      setValue('description', treeData.description);
      setValue('category', treeData?.category);
      setValue('trending', treeData.trending);
      setValue('oldPrice', treeData.oldPrice);
      setValue('newPrice', treeData.newPrice);
      setValue('coverImage', treeData.coverImage)
    }
  }, [treeData, setValue])

  const onSubmit = async (data) => {
    const updateTreeData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || treeData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/trees/edit/${id}`, updateTreeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Tree Updated",
        text: "Your tree is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch()
    } catch (error) {
      console.log("Failed to update tree.");
      alert("Failed to update tree.");
    }
  }
  if (isLoading) return <Loading/>
  if (isError) return <div>Error fetching tree data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update tree</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter tree title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter tree description"
          type="textarea"
          register={register}
        />
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

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Tree
        </button>
      </form>
    </div>
  )
}

export default UpdateTree