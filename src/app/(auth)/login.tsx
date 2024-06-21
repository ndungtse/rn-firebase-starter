import CustomInput from '@/components/core/inputs/CustomInput';
import TextField from '@/components/core/inputs/TextField';
import { useAuth } from '@/contexts/AuthProvider';
import useStorage from '@/hooks/useStorage';
import { api, getResError } from '@/utils/fetch';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const LoginScreen = () => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const { storeData } = useStorage()
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const router = useRouter()

  const onLogin = async () => {
    setLoading(true)
    if (!data.email || !data.password) {
      setError('Please fill all fields')
      setLoading(false)
      return
    }
    try {
      /* Uncomment below to make a call request, also user */
      // const res = await api.post('/auth/login', data)
      // console.log(res.data)
      // const res_data = res.data.data
      // const token =res_data.token
      const token ='res_data.token'
      storeData('token', token)
      setToken(token)
      // setUser(res_data.user)
      setError('')
      router.push('/(tabs)')
    } catch (error) {
      const err = getResError(error)
      setError(err)
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <View
      className=' bg-primary flex-1 pt-20'>
      <View className=' bg-white rounded-t-[30px] flex-1'>
        <View className='flex mt-6 flex-row items-center justify-center'>
          <Text className=' text-4xl font-bold'>Mob</Text>
          <Text className=' text-4xl text-primary font-bold'>Starter</Text>
        </View>
        <Text className='font-bold mt-6 text-center'>Welcome ...</Text>
        <ScrollView className='flex-1 px-3'>
          <Text className='font-bold mt-1 opacity-50 text-sm text-center'>Sign in to continue</Text>
          {error ? <Text className='text-red-500 text-sm text-center'>{error}</Text> : null}
          <CustomInput leftSection={<Feather name="mail" size={28} color="gray" />}
            placeholder='Your Email'
            className='mt-8'
            onChange={(text) => setData({ ...data, email: text })} />
          <CustomInput onChange={(text) => setData({ ...data, password: text })}
            type="password"
            className='mt-5'
            placeholder='Your Password' leftSection={<Feather name="lock" size={28} color="gray" />}
          />
          <Pressable
            onPress={onLogin}
            disabled={loading}
            className='bg-primary w-full flex-row  items-center justify-center mt-6 p-3 px-8 rounded-md'>
            <Text className='text-white text-lg font-bold'>{loading ? 'Signing in..' : 'Sign in'}</Text>
          </Pressable>
          <View className='flex-row items-center mt-4'>
            <View className='flex-1 border-b-2 border-gray-300'></View>
            <Text className='mx-2 text-gray-400'>OR</Text>
            <View className='flex-1 border-b-2 border-gray-300'></View>
          </View>
          {/* google + facebook  */}
          <Pressable
            onPress={() => console.log('google')}
            className='bg-white border-2 border-gray-200 w-full flex-row  items-center justify-center mt-4 p-3 px-5 rounded-md'>
            <AntDesign name="google" size={24} color="black" />
            <Text className='text-gray-500 flex-1 text-center w-fit text-lg font-bold '>Sign in with Google</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log('facebook')}
            className=' border-2 border-gray-200 w-full flex-row  items-center justify-center mt-4 p-3 px-5 rounded-md'>
            <FontAwesome name="facebook-f" size={24} color="black" />
            <Text className='text-gray-500 flex-1 text-center w-fit text-lg font-bold '>Sign in with Facebook</Text>
          </Pressable>
          <Link href='/forgot-password' className='text-center mt-4 text-primary font-semibold'>Forgot Password?</Link>
          <Text className='text-center my-4 text-gray-400'>Don't have an account? <Link href={'/register'} className='text-primary font-bold'>Sign up</Link></Text>
        </ScrollView>
      </View>
      {/* </View> */}
    </View>
  )
}

export default LoginScreen