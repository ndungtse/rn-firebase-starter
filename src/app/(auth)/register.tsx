import CustomInput from '@/components/core/inputs/CustomInput';
import { api } from '@/utils/fetch';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const RegisterScreen = () => {
    const [data, setData] = React.useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const onRegister = async () => {
        setLoading(true)
        if (!data.fullName || !data.phoneNumber || !data.email || !data.password) {
            setError('Please fill all fields')
            setLoading(false)
            return
        }
        try {
            const res = await api.post('/auth/register', data)
            console.log(res.data)
            setError('')
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }


    return (

        <View className=' bg-primary flex-1 pt-20'>
            <View className=' bg-white rounded-t-[30px] flex-1'>
                <View className='flex flex-row mt-6 items-center justify-center'>
                    <Text className=' text-4xl font-bold'>Supa</Text>
                    <Text className=' text-4xl text-primary font-bold'>Menu</Text>
                </View>
                <Text className='font-bold mt-8 text-center'>Welcome ...</Text>
                <ScrollView className='flex-1 px-3'>
                    <Text className='font-bold mt-1 opacity-50 text-sm text-center'>Please fill in the information</Text>
                    {error ? <Text className='text-red-500 text-sm text-center'>{error}</Text> : null}
                    <CustomInput leftSection={<Feather name="user" size={28} color="gray" />}
                        onChange={(text) => setData({ ...data, fullName: text })}
                        placeholder='Your Full Names'
                    />
                    <CustomInput className='mt-4' leftSection={<Feather name="phone" size={28} color="gray" />}
                        placeholder='Your Phone Number'
                        keyboardType='phone-pad'
                    />
                    <CustomInput leftSection={<Feather name="mail" size={28} color="gray" />}
                        placeholder='Your Email'
                        className='mt-4'
                        keyboardType='email-address' />
                    <CustomInput onChange={(text) => setData({ ...data, password: text })}
                        type="password"
                        className='mt-5'
                        placeholder='Your Password' leftSection={<Feather name="lock" size={28} color="gray" />}
                    />
                    <Pressable
                        onPress={onRegister}
                        disabled={loading}
                        className='bg-primary w-full flex-row  items-center justify-center mt-6 p-3 px-8 rounded-md'>
                        <Text className='text-white text-lg font-bold'>
                            {loading ? 'Registering..' : 'Register'}
                        </Text>
                    </Pressable>
                    <Text className='text-center mt-8 text-gray-400'>Already have an account? <Link href={'/login'} className='text-primary font-bold'>Sign in</Link></Text>
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterScreen